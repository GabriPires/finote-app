import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

import { createNewNote } from '@/api/create-new-note'
import { Button } from '@/components/button'
import { FormControl } from '@/components/form-control'
import { FormErrorMessage } from '@/components/form-error-message'
import { Header } from '@/components/header'
import { Input } from '@/components/input'

const newNoteSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  description: z
    .string()
    .optional()
    .transform((value) => value || ''),
})

type NewNoteFormSchema = z.infer<typeof newNoteSchema>

export function NewNoteScreen() {
  const insets = useSafeAreaInsets()
  const queryClient = useQueryClient()
  const { navigate } = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewNoteFormSchema>({
    resolver: zodResolver(newNoteSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const { mutateAsync: createNewNoteFn, isPending: isLoadingCreateNewNote } =
    useMutation({
      mutationFn: createNewNote,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['recent-notes'],
        })
        navigate('note', { id: data?.[0].id! })
      },
    })

  async function handleCreateNote({ title, description }: NewNoteFormSchema) {
    await createNewNoteFn({
      title,
      description,
    })
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : insets.bottom + 16}
        className="flex-1 flex-col p-4"
      >
        <Text className="mb-4 font-subtitle text-2xl text-zinc-50">
          Criando uma nova nota
        </Text>

        <FormControl label="Titulo da nota">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} />
            )}
          />
          <FormErrorMessage message={errors.title?.message} />
        </FormControl>

        <View className="h-4" />

        <FormControl label="Descrição">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                multiline
                value={value}
                className="h-20"
                numberOfLines={4}
                onChangeText={onChange}
              />
            )}
          />
          <FormErrorMessage message={errors.description?.message} />
        </FormControl>

        <Button
          className="mt-4"
          isLoading={isLoadingCreateNewNote}
          onPress={handleSubmit(handleCreateNote)}
        >
          <Text className="font-subtitle text-lg text-zinc-50">
            Salvar nota
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </View>
  )
}
