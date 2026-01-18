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
import Button from 'components/Button';

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
      <Button title="My Button"></Button>
      <Button title="My secondary button" style='wire'></Button>
      <Button title="My muted button" style='muted'></Button>
    </View>
  );
}
