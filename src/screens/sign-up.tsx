import { Button } from '@components/button'
import { FormControl } from '@components/form-control'
import { FormErrorMessage } from '@components/form-error-message'
import { Input } from '@components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@lib/supabase'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

const signUpFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type SignUpFormValues = z.infer<typeof signUpFormSchema>

export function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { navigate } = useNavigation()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 16

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignUp({ email, password }: SignUpFormValues) {
    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(
          'Ocorreu um erro ao se registrar, por favor tente novamente mais tarde.',
        )
      }
    } catch (error) {
      setError(
        'Ocorreu um erro ao se registrar, por favor tente novamente mais tarde.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleSignIn() {
    navigate('sign-in')
  }

  return (
    <View
      className="flex-1 bg-zinc-900"
      style={{
        paddingTop,
      }}
    >
      <KeyboardAvoidingView className="my-auto p-8">
        <Text className="font-subtitle mb-4 text-4xl text-zinc-50">
          Criar uma conta
        </Text>

        {error && (
          <Text className="mb-4 text-center text-rose-500">{error}</Text>
        )}

        <FormControl label="E-mail">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
              />
            )}
          />
          <FormErrorMessage message={errors.email?.message} />
        </FormControl>

        <FormControl label="Senha">
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={onChange}
              />
            )}
          />
          <FormErrorMessage message={errors.password?.message} />
        </FormControl>

        <Button className="mt-4" onPress={handleSubmit(handleSignUp)}>
          <Text className="font-subtitle text-lg text-zinc-50">
            Criar conta
          </Text>
        </Button>

        <TouchableOpacity className="mt-4" onPress={handleSignIn}>
          <Text className="font-subtitle text-sm text-zinc-50">
            Já tenho uma conta
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}
