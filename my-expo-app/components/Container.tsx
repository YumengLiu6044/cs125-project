import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaProvider className={styles.container}>
    <SafeAreaView>{children}</SafeAreaView>{children}
  </SafeAreaProvider>;
};

const styles = {
  container: 'flex flex-1 m-6',
};
