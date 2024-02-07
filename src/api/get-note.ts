import { supabase } from '@/lib/supabase'

interface GetNoteParams {
  noteId: string
}

export async function getNote({ noteId }: GetNoteParams) {
  const { data } = await supabase
    .from('notes')
    .select('*')
    .eq('id', noteId)
    .single()

  return data
}
