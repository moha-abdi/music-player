import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { FontAwesome } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PlaylistsScreenLayout = () => {
  const router = useRouter()
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenWithSearchBar,
						headerTitle: 'Playlists',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push('account')} style={{ paddingRight: 10 }}>
                <FontAwesome name="user-circle-o" size={22} color={colors.primary} />
              </TouchableOpacity>
            )
					}}
				/>

				<Stack.Screen
					name="[name]"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.primary,
					}}
				/>
			</Stack>
		</View>
	)
}

export default PlaylistsScreenLayout
