import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useLayoutEffect } from 'react'

import { Loading } from '@/components/loading'
import { supabase } from '@/lib/supabase'
import { HomeScreen } from '@/screens/home'
import { NewNoteScreen } from '@/screens/new-note'
import { NoteScreen } from '@/screens/note'
import { NotesScreen } from '@/screens/notes'
import { SignInScreen } from '@/screens/sign-in'
import { SignUpScreen } from '@/screens/sign-up'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  const { reset } = useNavigation()

  useLayoutEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        if (!session) {
          reset({
            index: 0,
            routes: [{ name: 'sign-in' }],
          })
        } else {
          reset({
            index: 0,
            routes: [{ name: 'home' }],
          })
        }
      },
    )

    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [reset])

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="loading" component={Loading} />
      <Screen name="sign-in" component={SignInScreen} />
      <Screen name="sign-up" component={SignUpScreen} />
      <Screen name="home" component={HomeScreen} />
      <Screen name="notes" component={NotesScreen} />
      <Screen name="note" component={NoteScreen} />
      <Screen name="new-note" component={NewNoteScreen} />
    </Navigator>
  )
}
