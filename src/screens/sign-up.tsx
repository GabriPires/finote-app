import { Button } from '@components/button'
import { FormControl } from '@components/form-control'
import { FormErrorMessage } from '@components/form-error-message'
import { Input } from '@components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@lib/supabase'
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

const signUpFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type SignUpFormValues = z.infer<typeof signUpFormSchema>

export function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { navigate } = useNavigation()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 16

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignUp({ email, password }: SignUpFormValues) {
    await supabase.auth
      .signUp({
        email,
        password,
      })
      .then(async () => {
        await supabase.auth.signInWithPassword({
          email,
          password,
        })
      })
      .catch(() => {
        setError(
          'Ocorreu um erro ao se registrar, por favor tente novamente mais tarde.',
        )
      })
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
      <KeyboardAvoidingView
        className="my-auto p-8"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : insets.bottom + 16}
      >
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
                  onSubmitEditing={handleSubmit(handleSignUp)}
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
          onPress={handleSubmit(handleSignUp)}
        >
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
