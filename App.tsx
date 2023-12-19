import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { StatusBar, View } from 'react-native'
import { Loading } from './src/components/Loading'
import { SignInScreen } from './src/screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignInScreen /> : <Loading />}
    </View>
  )
}
