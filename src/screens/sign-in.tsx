import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { Eye, EyeClosed } from 'phosphor-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'
import { z } from 'zod'

import { Button } from '@/components/button'
import { FormControl } from '@/components/form-control'
import { FormErrorMessage } from '@/components/form-error-message'
import { Input } from '@/components/input'
import { supabase } from '@/lib/supabase'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type SignInFormValues = z.infer<typeof signInFormSchema>

export function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { navigate } = useNavigation()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 16

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn({ email, password }: SignInFormValues) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('E-mail ou senha inválidos, tente novamente.')
    }
  }

  function handleSignUp() {
    navigate('sign-up')
  }

  return (
    <View
      className="flex-1 bg-zinc-900"
      style={{
        paddingTop,
      }}
    >
      <KeyboardAvoidingView
        className="my-auto p-8"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : insets.bottom + 16}
      >
        <Text className="mb-4 font-subtitle text-4xl text-zinc-50">
          Acessar
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

        <View className="h-4" />

        <FormControl label="Senha">
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View className="relative">
                <Input
                  value={value}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignIn)}
                />
                <TouchableOpacity
                  className="absolute right-2 top-2.5"
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeClosed color={colors.zinc[50]} />
                  ) : (
                    <Eye color={colors.zinc[50]} />
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
          <FormErrorMessage message={errors.password?.message} />
        </FormControl>

        <Button
          className="mt-4"
          isLoading={isSubmitting}
          onPress={handleSubmit(handleSignIn)}
        >
          <Text className="font-subtitle text-lg text-zinc-50">Entrar</Text>
        </Button>

        <View className="mt-4 flex-row justify-between">
          <TouchableOpacity>
            <Text className="font-subtitle text-sm text-zinc-50">
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Text className="font-subtitle text-sm text-zinc-50">
              Criar uma conta
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
