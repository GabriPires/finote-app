import { useRoute } from '@react-navigation/native'
import { FlatList, Text, View } from 'react-native'

import { EntryListItem } from '@/components/entry-list-item'
import { Header } from '@/components/header'

interface NoteScreenParamsProps {
  id: string
}

export function NoteScreen() {
  const route = useRoute()
  const { id } = route.params as NoteScreenParamsProps

  const entries = [
    {
      title: 'Entry 1',
      value: 15,
      type: 'income',
    },
    {
      title: 'Entry 2',
      value: 15,
      type: 'outcome',
    },
    {
      title:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, quia nesciunt, eveniet similique laboriosam esse quibusdam laborum velit iure voluptate neque ipsum dolorem inventore fuga consequuntur? Minima, ducimus assumenda. Ea?',
      value: 15,
      type: 'income',
    },
  ]

  return (
    <View className="flex-1 bg-zinc-900">
      <Header />

      <View className="flex-1 flex-col p-4">
        <Text className="font-subtitle text-2xl text-zinc-50" numberOfLines={3}>
          Nota exemplo
        </Text>

        <Text className="mt-2 font-body text-zinc-300" numberOfLines={6}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, quia
          nesciunt, eveniet similique laboriosam esse quibusdam laborum velit
          iure voluptate neque ipsum dolorem inventore fuga consequuntur?
          Minima, ducimus assumenda. Ea?
        </Text>

        <FlatList
          data={entries}
          className="mt-4"
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <EntryListItem item={item} />}
        />
      </View>
    </View>
  )
}
