import { PropsWithChildren } from 'react'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface FormControlProps {
  label?: string
  className?: string
}

export function FormControl({
  children,
  label,
  className,
}: PropsWithChildren<FormControlProps>) {
  return (
    <View className={twMerge('flex-col', className)}>
      {label && <Text className="mb-1 font-body text-zinc-50">{label}</Text>}
      {children}
    </View>
  )
}
