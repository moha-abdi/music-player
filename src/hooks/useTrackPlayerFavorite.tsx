import { useAuth } from '@/context/AuthContext'
import { useFavorites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()

	const { toggleTrackFavorite } = useFavorites()
  const { favorites } = useAuth()
  const { addTrackToFavorites, removeTrackFromFavorites } = useAuth()

  const isFavorite = activeTrack ? favorites.includes(activeTrack.url) : false;

	// we're updating both the track player internal state and application internal state
	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		if (id == null) return

		// update track player internal state
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavorite ? 0 : 1,
		})

		// update the app internal state
		if (activeTrack) {
			if (!isFavorite) {
        await addTrackToFavorites(activeTrack.url)
      } else {
        await removeTrackFromFavorites(activeTrack.url)
      }
		}
	}, [isFavorite, toggleTrackFavorite, activeTrack])

	return { isFavorite, toggleFavorite }
}
