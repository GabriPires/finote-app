import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'phosphor-react-native'
import { FlatList, Text, View } from 'react-native'

import { getLastNotes } from '@/api/get-last-notes'
import { Header } from '@/components/header'
import { IconButton } from '@/components/icon-button'
import { NoteListItem } from '@/components/note-list-item'
import { supabase } from '@/lib/supabase'

export function HomeScreen() {
  const { navigate } = useNavigation()
  const { data: notes } = useQuery({
    queryKey: ['recent-notes'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const data = await getLastNotes({ userId: user?.id! })
      return data
    },
  })

  function handleCreateNote() {
    navigate('new-note')
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <Header />

      <View className="flex-1 flex-col">
        <View className="flex-row items-center justify-between p-4">
          <Text className="font-subtitle text-2xl text-zinc-50">
            Suas últimas notas
          </Text>

          <IconButton icon={PlusCircle} onPress={handleCreateNote} />
        </View>

        <FlatList
          data={notes}
          horizontal
          className="max-h-14"
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(note) => note.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <NoteListItem id={item.id} title={item.title} />
          )}
          ListEmptyComponent={() => (
            <Text className="text-center font-body text-zinc-50">
              Você ainda não tem nenhuma nota criada.
            </Text>
          )}
        />
      </View>
    </View>
  )
}
