import { SignOut } from 'phosphor-react-native'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { IconButton } from './IconButton'

export function Header() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 12

  return (
    <View
      className="flex flex-row items-center justify-between rounded-b-2xl bg-zinc-950 px-6 pb-3"
      style={{
        paddingTop,
      }}
    >
      <Image
        source={{ uri: 'https://github.com/GabriPires.png' }}
        alt="Foto de perfil do usuário"
        className="h-10 w-10 rounded-full"
      />

      <IconButton icon={SignOut} />
    </View>
  )
}
