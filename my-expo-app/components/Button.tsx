import { IconNode } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  style?: keyof typeof ButtonStyles;
  icon?: ReactNode | (() => ReactNode);
  className?: string;
}

export default function Button({
  onPress,
  title,
  style = 'primary',
  icon,
  className,
}: ButtonProps) {
  const selectedStyle = ButtonStyles[style];

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-2xl px-[24px] py-[16px] ${selectedStyle.pressable} ${className}`}
      accessibilityLabel={title}>
      {icon && <View className='mr-2'>{typeof icon === 'function' ? icon() : icon}</View>}
      <Text className={`font-bold text-lg ${selectedStyle.text}`}>{title}</Text>
    </Pressable>
  );
}

const ButtonStyles = {
  primary: {
    pressable: 'bg-orange-500 active:bg-orange-600',
    text: '',
  },
  simple: {
    pressable: 'active:bg-transparent',
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
