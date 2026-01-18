import { CircleCheck, Eye, EyeOff, Info } from 'lucide-react-native';
import { TextInput, TextInputProps, View } from 'react-native';

interface InputFieldProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: keyof typeof InputStyles;
  textContentType?: TextInputProps['textContentType'];
  autocomplete?: TextInputProps['autoComplete'];
}

export default function InputField({
  value,
  placeholder,
  onChangeText,
  style = 'default',
  textContentType = 'none',
  autocomplete,
}: InputFieldProps) {
  const styles = InputStyles[style];

  return (
    <View className="relative w-full border-red-500">
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#9CA3AF"
        className={`w-full rounded-2xl px-5 py-4 pr-10 ${styles.input}`}
        textAlignVertical="center"
        style={{ padding: 0 }}
        secureTextEntry={style === 'passwordHide'}
        textContentType={textContentType}
        autoComplete={autocomplete}
      />
      {styles.Icon && (
        <View className="absolute right-4 top-1/2 -translate-y-1/2">{styles.Icon}</View>
      )}
    </View>
  );
}

const InputStyles = {
  default: {
    input: 'border border-gray-200 bg-white',
    Icon: null,
    iconColor: '',
  },
  success: {
    input: 'border border-green-500 bg-white',
    Icon: <CircleCheck size={20} color="#22c55e" />,
  },
  error: {
    input: 'border border-red-500 bg-white',
    Icon: <Info size={20} color="#ef4444" />,
  },
  passwordShow: {
    input: 'border border-gray-200 bg-white',
    Icon: <Eye size={20} color="black"></Eye>,
    iconColor: '',
  },
  passwordHide: {
    input: 'border border-gray-200 bg-white',
    Icon: <EyeOff size={20} color="black"></EyeOff>,
    iconColor: '',
  },
} as const;
