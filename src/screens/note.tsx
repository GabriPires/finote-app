import BottomSheet from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Note, Plus, Trash } from 'phosphor-react-native'
import { useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view'
import colors from 'tailwindcss/colors'

import { deleteNoteEntry } from '@/api/delete-note-netry'
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

  const queryClient = useQueryClient()

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

  const {
    mutateAsync: deleteNoteEntryFn,
    isPending: isLoadingDeleteNoteEntry,
  } = useMutation({
    mutationFn: deleteNoteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note-entries', id] })
    },
  })

  async function handleDeleteEntry(id: string) {
    await deleteNoteEntryFn({ entryId: id })
  }

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
          {isLoadingDeleteNoteEntry ? (
            <ActivityIndicator className="mr-1" />
          ) : (
            <Note color={colors.zinc[50]} size={24} />
          )}
          {note.title}
        </Text>

        <Text className="mt-2 font-body text-zinc-300" numberOfLines={6}>
          {note.description}
        </Text>

        {isLoadingEntries && <ActivityIndicator className="mt-4" />}

        <SwipeListView
          data={entries}
          className="mt-2"
          ListEmptyComponent={() => (
            <Text className="text-zinc-500">
              Nenhuma anotação encontrada, comece criando uma
            </Text>
          )}
          disableRightSwipe
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <EntryListItem item={item} />}
          renderHiddenItem={({ item }) => (
            <View className="flex-row items-center justify-end p-2">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={async () => await handleDeleteEntry(item.id)}
              >
                <Trash color={colors.rose[500]} />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-50}
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
