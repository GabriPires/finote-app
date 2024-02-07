import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

import { getNote } from '@/api/get-note'
import { getNoteEntries } from '@/api/get-note-entries'
import { EntryListItem } from '@/components/entry-list-item'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'

interface NoteScreenParamsProps {
  id: string
}

export function NoteScreen() {
  const route = useRoute()
  const { id } = route.params as NoteScreenParamsProps

  const { data: note, isLoading: isLoadingNote } = useQuery({
    queryKey: ['note', id],
    queryFn: async () => getNote({ noteId: id }),
    enabled: !!id,
  })

  const { data: entries, isLoading: isLoadingEntries } = useQuery({
    queryKey: ['note-entries', id],
    queryFn: async () => getNoteEntries({ noteId: id }),
    enabled: !!id,
  })

  if (!note || isLoadingNote) {
    return (
      <View className="flex-1 bg-zinc-900">
        <Header />
        <Loading />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <Header />

      <View className="flex-1 flex-col p-4">
        <Text className="font-subtitle text-2xl text-zinc-50" numberOfLines={3}>
          {note.title}
        </Text>

        <Text className="mt-2 font-body text-zinc-300" numberOfLines={6}>
          {note.description}
        </Text>

        {isLoadingEntries && <ActivityIndicator className="mt-4" />}

        <FlatList
          data={entries}
          className="mt-4"
          ListEmptyComponent={() => (
            <Text className="text-zinc-500">
              Nenhuma anotação encontrada, comece criando uma
            </Text>
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <EntryListItem item={item} />}
        />
      </View>
    </View>
  )
}
