import { Pressable, Text } from 'react-native';

interface StyledButtonProps {
  onPress?: () => void;
  title: string;
  style?: keyof typeof ButtonStyles;
}
export default function StyledButton({ onPress, title, style = 'primary' }: StyledButtonProps) {
  const selectedStyle = ButtonStyles[style];

  return (
    <Pressable
      onPress={onPress}
      className={
        'flex w-full items-center justify-center rounded-2xl px-[24px] py-[16px] ' +
        selectedStyle.pressable
      }
      accessibilityLabel={title}>
      <Text className={'text-lg font-bold ' + selectedStyle.text}>{title}</Text>
    </Pressable>
  );
}

const ButtonStyles = {
  primary: {
    pressable: 'bg-primary',
    text: '',
  },
  wire: {
    pressable: 'border border-gray-300',
    text: '',
  },
  muted: {
    pressable: 'bg-gray-300',
    text: 'text-gray-500',
  },
};
