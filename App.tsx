import { StatusBar } from 'react-native'
import { SignInScreen } from './src/screens/SignIn'

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SignInScreen />
    </>
  )
}
