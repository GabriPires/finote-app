import { PropsWithChildren } from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import colors from 'tailwindcss/colors'

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

export function Button({
  isLoading = false,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className="max-h-[56px] min-h-[56px] flex-1 flex-row items-center justify-center rounded-md bg-purple-500 p-3 dark:bg-purple-400"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.purple[500]} size={40} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
