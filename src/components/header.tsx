import { SignOut } from 'phosphor-react-native'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { supabase } from '@/lib/supabase'

import { IconButton } from './icon-button'

export function Header() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 16

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <View
      className="flex flex-row items-center justify-between border-b border-zinc-700 bg-zinc-950 px-6 pb-6"
      style={{
        paddingTop,
      }}
    >
      <View className="overflow-hidden rounded-full border-2  border-zinc-700">
        <Image
          source={{ uri: 'https://github.com/GabriPires.png' }}
          alt="Foto de perfil do usuário"
          className="h-10 w-10"
        />
      </View>

      <IconButton icon={SignOut} onPress={handleSignOut} />
    </View>
  )
}
