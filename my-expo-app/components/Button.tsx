import { Pressable, Text } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  style?: keyof typeof ButtonStyles;
}

export default function Button({
  onPress,
  title,
  style = 'primary',
}: ButtonProps) {
  const selectedStyle = ButtonStyles[style];

  return (
    <Pressable
      onPress={onPress}
      className={`flex w-full items-center justify-center rounded-2xl px-[24px] py-[16px] ${selectedStyle.pressable}`}
      accessibilityLabel={title}
    >
      <Text className={`font-bold text-lg ${selectedStyle.text}`}>
        {title}
      </Text>
    </Pressable>
  );
}

const ButtonStyles = {
  primary: {
    pressable: 'bg-orange-500 active:bg-orange-600',
    text: '',
  },
  wire: {
    pressable: 'border border-gray-300 active:bg-gray-100',
    text: '',
  },
  muted: {
    pressable: 'bg-gray-300',
    text: 'text-gray-500',
  },
} as const;
