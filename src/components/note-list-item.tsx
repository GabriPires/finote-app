import { useNavigation } from '@react-navigation/native'
import { Note } from 'phosphor-react-native'
import { Text, TouchableOpacity } from 'react-native'
import colors from 'tailwindcss/colors'

interface NoteListItemProps {
  id: string
  title: string
}

export function NoteListItem({ id, title }: NoteListItemProps) {
  const { navigate } = useNavigation()

  return (
    <TouchableOpacity
      className="flex-row items-center rounded-md bg-zinc-800 p-4"
      activeOpacity={0.4}
      onPress={() => navigate('note', { id })}
    >
      <Note size={24} color={colors.zinc[50]} />
      <Text className="ml-2 font-body text-zinc-50">{title}</Text>
    </TouchableOpacity>
  )
}
