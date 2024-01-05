import { Note } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

interface NoteListItemProps {
  title: string
}

export function NoteListItem({ title }: NoteListItemProps) {
  return (
    <View className="flex-row items-center rounded-md bg-zinc-800 p-4">
      <Note size={24} color={colors.zinc[50]} />
      <Text className="ml-2 font-poppins-sans text-zinc-50">{title}</Text>
    </View>
  )
}
