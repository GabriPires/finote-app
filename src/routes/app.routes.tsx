import { supabase } from '@lib/supabase'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '@screens/Home'
import { NoteScreen } from '@screens/Note'
import { NotesScreen } from '@screens/Notes'
import { SignInScreen } from '@screens/sign-in'
import { SignUpScreen } from '@screens/sign-up'
import { useEffect } from 'react'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log(user)
    })
  }, [])

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="sign-in" component={SignInScreen} />
      <Screen name="sign-up" component={SignUpScreen} />
      <Screen name="home" component={HomeScreen} />
      <Screen name="notes" component={NotesScreen} />
      <Screen name="note" component={NoteScreen} />
    </Navigator>
  )
}
