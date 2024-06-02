import { playbackService } from '@/constants/playbackService'
import { colors } from '@/constants/tokens'
import { AuthContext, AuthContextProvider, useAuth } from '@/context/AuthContext'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TrackPlayer from 'react-native-track-player'

SplashScreen.preventAutoHideAsync()

TrackPlayer.registerPlaybackService(() => playbackService)

const App = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})

	useLogTrackPlayerState()

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <RootNavigation />
        </AuthContextProvider>
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

const MainNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

			<Stack.Screen
				name="player"
				options={{
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="(modals)/addToPlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitle: 'Add to playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
		</Stack>
	)
}

type AuthProps = {
  authScreen: string
}

const AuthNavigation = ({authScreen}: AuthProps) => {
  const authScreenToUse = ['signup', 'login'].includes(authScreen) ? authScreen : 'login';
  const router = useRouter()

  useEffect(() => {
    router.replace("/"+authScreenToUse)
  })

  return <Slot />
}

const RootNavigation = () => {
  const {isAuthenticated} = useAuth()
  const segments = useSegments()
  const authScreen = segments[1]

  return (
    isAuthenticated ? <MainNavigation /> : <AuthNavigation authScreen={authScreen}/>
  )

}

export default App
