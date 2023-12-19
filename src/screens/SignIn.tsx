import { GoogleLogo } from 'phosphor-react-native'
import { Text, TouchableOpacity, View } from 'react-native'

export function SignInScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Vamos começar?</Text>

      <TouchableOpacity>
        <GoogleLogo />
        <Text>Entrar com o Google</Text>
      </TouchableOpacity>
    </View>
  )
}
