import clsx from 'clsx'
import { Text, View } from 'react-native'
import { tv } from 'tailwind-variants'

import { Tables } from '../@types/supabase'

const entryValue = tv({
  base: 'ml-auto font-body leading-tight',
  variants: {
    type: {
      income: 'text-green-500',
      outcome: 'text-red-500',
    },
  },
})

type EntryValueVariantType = keyof (typeof entryValue)['variants']['type']

interface EntryListItemProps {
  item: Tables<'entries'>
  loading?: boolean
}

export function EntryListItem({ item, loading = false }: EntryListItemProps) {
  return (
    <View
      className={clsx(
        'flex-row items-center rounded-md bg-zinc-800 p-3',
        loading ? 'opacity-30' : 'opacity-100',
      )}
    >
      <Text
        className="mr-2 font-body leading-tight text-zinc-50"
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text
        className={entryValue({ type: item.type as EntryValueVariantType })}
      >
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(item.value)}
      </Text>
    </View>
  )
}
