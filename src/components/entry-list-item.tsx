import { Text, View } from 'react-native'
import { tv } from 'tailwind-variants'

import { Tables } from '../@types/supabase'

interface EntryListItemProps {
  item: Tables<'entries'>
}

const entryValue = tv({
  base: 'ml-auto font-body leading-tight',
  variants: {
    type: {
      income: 'text-green-500',
      outcome: 'text-red-500',
    },
  },
})

export function EntryListItem({ item }: EntryListItemProps) {
  return (
    <View className="flex-row items-center rounded-md bg-zinc-800 p-2">
      <Text
        className="mr-2 font-body leading-tight text-zinc-50"
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text className={entryValue({ type: item.type })}>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(item.value)}
      </Text>
    </View>
  )
}
