import uuid from 'react-native-uuid'

import { supabase } from '@/lib/supabase'

interface CreateNewNoteEntryParams {
  noteId: string
  title: string
  value: number
  type: 'income' | 'outcome'
}

export async function createNewNoteEntry({
  noteId,
  title,
  value,
  type,
}: CreateNewNoteEntryParams) {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData) throw new Error('Usuário não encontrado')

  const { user } = userData

  if (!user) throw new Error('Usuário não encontrado')

  return await supabase.from('entries').insert([
    {
      id: uuid.v4().toString(),
      title,
      value,
      type,
      notes_id: noteId,
    },
  ])
}
