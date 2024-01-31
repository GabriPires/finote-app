import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface InputProps extends TextInputProps {}

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={twMerge(
        'rounded bg-zinc-800 px-2 py-3 font-sans text-zinc-50',
        className,
      )}
      {...props}
    />
  )
}
