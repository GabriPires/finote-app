import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { StyleSheet, TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {}

export function BottomSheetInput({ ...props }: InputProps) {
  return <BottomSheetTextInput style={styles.input} {...props} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#18181b',
    borderRadius: 4,
    color: '#f8fafc',
    fontFamily: 'Poppins_400Regular',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
})
