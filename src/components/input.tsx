import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const input = tv({
  base: 'rounded bg-zinc-800 px-2 py-3 font-body text-zinc-50',
  variants: {
    variant: {
      default: 'bg-zinc-800',
      secondary: 'bg-zinc-900',
    },
  },
})

type InputVariants = keyof typeof input.variants.variant

interface InputProps extends TextInputProps {
  variant?: InputVariants
}

export function Input({
  className,
  variant = 'default',
  ...props
}: InputProps) {
  return (
    <TextInput className={twMerge(input({ variant }), className)} {...props} />
  )
}
