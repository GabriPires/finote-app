import { Button } from '@components/Button'
import { GoogleLogo } from 'phosphor-react-native'
import { Text, TouchableOpacity, View } from 'react-native'

export function SignInScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-poppins-bold">Vamos começar?</Text>

      <TouchableOpacity>
        <GoogleLogo />
        <Text>Entrar com o Google</Text>
        <Button title="Entrar com o Google" />
      </TouchableOpacity>
    </View>
  )
}
