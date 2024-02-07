import uuid from 'react-native-uuid'

import { supabase } from '@/lib/supabase'

interface CreateNewNoteParams {
  title: string
  description: string
}

export async function createNewNote({
  title,
  description,
}: CreateNewNoteParams) {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData) throw new Error('Usuário não encontrado')

  const { user } = userData

  if (!user) throw new Error('Usuário não encontrado')

  const { data } = await supabase
    .from('notes')
    .insert([
      {
        id: uuid.v4().toString(),
        title,
        description,
        user_id: user.id,
      },
    ])
    .select()

  return data
}
