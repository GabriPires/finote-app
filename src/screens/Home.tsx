import { Header } from '@components/Header'
import { IconButton } from '@components/IconButton'
import { NoteListItem } from '@components/NoteListItem'
import { PlusCircle } from 'phosphor-react-native'
import { FlatList, Text, View } from 'react-native'

export function HomeScreen() {
  return (
    <View className="flex-1 bg-zinc-900">
      <Header />

      <View className="flex-1 flex-col p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-subtitle text-2xl text-zinc-50">
            Suas últimas notas
          </Text>

          <IconButton icon={PlusCircle} />
        </View>

        <FlatList
          data={Array.from({ length: 5 })}
          className="mt-4"
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ index }) => (
            <NoteListItem title={`Nota ${index + 1}`} />
          )}
        />
      </View>
    </View>
  )
}
