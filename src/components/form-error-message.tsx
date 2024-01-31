import { Text } from 'react-native'

interface FormErrorMessageProps {
  message?: string
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null

  return <Text className="text-xs text-rose-500">{message}</Text>
}
