import { StatusBar, View } from 'react-native'
import { SignInScreen } from './src/screens/SignIn'

export default function App() {
  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SignInScreen />
    </View>
  )
}
