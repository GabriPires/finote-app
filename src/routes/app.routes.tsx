import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '@screens/Home'
import { NoteScreen } from '@screens/Note'
import { NotesScreen } from '@screens/Notes'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={HomeScreen} />
      <Screen name="notes" component={NotesScreen} />
      <Screen name="note" component={NoteScreen} />
    </Navigator>
  )
}
