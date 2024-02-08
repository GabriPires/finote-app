import BottomSheet from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'phosphor-react-native'
import { useMemo, useRef } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'

import { getNote } from '@/api/get-note'
import { getNoteEntries } from '@/api/get-note-entries'
import { Button } from '@/components/button'
import { EntryListItem } from '@/components/entry-list-item'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { NoteEntryForm } from '@/components/note-entry-form'

interface NoteScreenParamsProps {
  id: string
}

export function NoteScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const insets = useSafeAreaInsets()
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

  const total = useMemo(
    () =>
      entries?.reduce((acc, entry) => {
        return entry.type === 'income' ? acc + entry.value : acc - entry.value
      }, 0) || 0,
    [entries],
  )

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

      <View className="relative flex-1 flex-col p-4">
        <Text
          className="truncate font-subtitle text-2xl text-zinc-50"
          numberOfLines={3}
        >
          {note.title}
        </Text>

        <Text className="mt-2 font-body text-zinc-300" numberOfLines={6}>
          {note.description}
        </Text>

        {isLoadingEntries && <ActivityIndicator className="mt-4" />}

        <FlatList
          data={entries}
          className="mt-2"
          ListEmptyComponent={() => (
            <Text className="text-zinc-500">
              Nenhuma anotação encontrada, comece criando uma
            </Text>
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <EntryListItem item={item} />}
        />

        <Text className="mb-2 pt-2 text-right font-subtitle text-lg text-zinc-50">
          {total > 0 ? 'Renda total' : 'Despesa total'}: R${' '}
          {total.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>

        <Button
          className="rounded-full bg-violet-500 p-3"
          style={{
            marginBottom: insets.bottom,
          }}
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        >
          <Plus size={24} color={colors.zinc[50]} />
          <Text className="ml-2 font-subtitle text-lg text-zinc-50">
            Nova anotação
          </Text>
        </Button>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[500]}
          enablePanDownToClose
          index={-1}
          backgroundStyle={{
            backgroundColor: colors.zinc[800],
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.zinc[400],
          }}
        >
          <View className="p-4">
            <Text className="font-subtitle text-lg text-zinc-50">
              Nova anotação
            </Text>

            <NoteEntryForm
              noteId={id}
              onAddEntry={() => {
                bottomSheetRef.current?.close()
              }}
            />
          </View>
        </BottomSheet>
      </View>
    </View>
  )
}
