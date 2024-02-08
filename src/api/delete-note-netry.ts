import { supabase } from '@/lib/supabase'

interface DeleteNoteEntryParams {
  entryId: string
}

export async function deleteNoteEntry({ entryId }: DeleteNoteEntryParams) {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData) throw new Error('Usuário não encontrado')

  const { user } = userData

  if (!user) throw new Error('Usuário não encontrado')

  return await supabase.from('entries').delete().eq('id', entryId)
}
