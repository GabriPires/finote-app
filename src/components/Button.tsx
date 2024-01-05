import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import colors from 'tailwindcss/colors'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className="flex-1 min-h-[56px] max-h-[56px] items-center justify-center bg-purple-500 dark:bg-purple-400 rounded-md"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.purple[500]} size={40} />
      ) : (
        <Text className="font-poppins-medium">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
