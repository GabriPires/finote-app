import { IconProps } from 'phosphor-react-native'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { twMerge } from 'tailwind-merge'
import colors from 'tailwindcss/colors'

export type IconBoxProps = (props: IconProps) => JSX.Element

interface IconButtonProps extends TouchableOpacityProps {
  icon: IconBoxProps
}

export function IconButton({
  icon: Icon,
  className,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        'flex h-12 w-12 items-center justify-center rounded-md',
        className,
      )}
      activeOpacity={0.4}
      {...props}
    >
      <Icon size={24} color={colors.zinc[50]} />
    </TouchableOpacity>
  )
}
