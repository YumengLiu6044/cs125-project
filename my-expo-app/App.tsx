import { Text, View } from 'react-native';
import {
  useFonts,
  DMSans_300Light,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import './global.css';
import StyledButton from 'components/StyledButton';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_300Light,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });
  if (!fontsLoaded) return null;

  return (
    <View className="bg-bianca flex gap-4 h-screen w-screen items-center justify-center px-3">
      <StyledButton title="My Button"></StyledButton>
      <StyledButton title="My secondary button" style='wire'></StyledButton>
      <StyledButton title="My muted button" style='muted'></StyledButton>
    </View>
  );
}
