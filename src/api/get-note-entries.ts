import { supabase } from '@/lib/supabase'

interface GetNoteEntriesParams {
  noteId: string
}

export async function getNoteEntries({ noteId }: GetNoteEntriesParams) {
  const { data } = await supabase
    .from('entries')
    .select('*')
    .eq('notes_id', noteId)

  return data
}
