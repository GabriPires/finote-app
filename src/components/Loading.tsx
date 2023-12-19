import { ActivityIndicator, View } from 'react-native'
import colors from 'tailwindcss/colors'

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={colors.purple[500]} size={40} />
    </View>
  )
}
