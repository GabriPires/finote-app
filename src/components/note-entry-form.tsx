import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Minus, Plus } from 'phosphor-react-native'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'

import { createNewNoteEntry } from '@/api/create-new-note-entry'

import { BottomSheetInput } from './bottom-sheet-input'
import { Button } from './button'
import { FormControl } from './form-control'
import { FormErrorMessage } from './form-error-message'
import { NoteTypeButton } from './note-type-button'

const newEntryFormSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  value: z
    .string()
    .min(1, { message: 'Valor é obrigatório' })
    .transform((value) => value.replace(',', '.')),
  type: z.enum(['income', 'outcome']),
})

type NewEntryFormValues = z.infer<typeof newEntryFormSchema>

interface NoteEntryFormProps {
  noteId: string
  onAddEntry: () => void
}

export function NoteEntryForm({ noteId, onAddEntry }: NoteEntryFormProps) {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewEntryFormValues>({
    resolver: zodResolver(newEntryFormSchema),
    defaultValues: {
      title: '',
      value: '',
      type: 'income',
    },
  })

  const {
    mutateAsync: createNewNoteEntryFn,
    isPending: isLoadingCreateNewNoteEntry,
  } = useMutation({
    mutationFn: createNewNoteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['note-entries', noteId],
      })

      onAddEntry()
      reset()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  async function handleAddEntry({ title, type, value }: NewEntryFormValues) {
    await createNewNoteEntryFn({
      noteId,
      title,
      value: Number(value),
      type,
    })
  }

  return (
    <View className="mt-4 flex-col space-y-4">
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <FormControl label="Título">
            <BottomSheetInput value={value} onChangeText={onChange} />
            <FormErrorMessage message={errors.title?.message} />
          </FormControl>
        )}
      />

      <View className="h-1" />

      <Controller
        control={control}
        name="value"
        render={({ field: { onChange, value } }) => (
          <FormControl label="Valor">
            <BottomSheetInput
              value={value}
              inputMode="decimal"
              onChangeText={onChange}
            />
            <FormErrorMessage message={errors.value?.message} />
          </FormControl>
        )}
      />

      <View className="h-1" />

      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <FormControl label="Tipo">
            <View className="w-full flex-row items-center space-x-4">
              <NoteTypeButton
                active={value === 'income'}
                icon={Plus}
                onPress={() => onChange('income')}
              />

              <NoteTypeButton
                active={value === 'outcome'}
                icon={Minus}
                onPress={() => onChange('outcome')}
              />
            </View>
          </FormControl>
        )}
      />

      <Button
        isLoading={isLoadingCreateNewNoteEntry}
        onPress={handleSubmit(handleAddEntry)}
      >
        <Text className="font-subtitle text-lg text-zinc-50">Adicionar</Text>
      </Button>
    </View>
  )
}
