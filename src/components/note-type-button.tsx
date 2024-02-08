import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { tv } from 'tailwind-variants'
import colors from 'tailwindcss/colors'

import { IconBoxProps } from './icon-button'

const button = tv({
  base: 'rounded border border-zinc-500 p-2 flex-1 items-center',
  variants: {
    active: {
      true: 'border-violet-500 bg-violet-500/30',
      false: '',
    },
  },
})

interface NoteTypeButtonProps extends TouchableOpacityProps {
  active: boolean
  icon: IconBoxProps
}

export function NoteTypeButton({
  active,
  icon: Icon,
  ...props
}: NoteTypeButtonProps) {
  return (
    <TouchableOpacity
      className={button({ active })}
      activeOpacity={0.7}
      {...props}
    >
      <Icon size={24} color={active ? colors.violet[400] : colors.zinc[50]} />
    </TouchableOpacity>
  )
}
