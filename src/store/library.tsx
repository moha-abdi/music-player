import { unknownTrackImageUri } from '@/constants/images'
import { useAuth } from '@/context/AuthContext'
import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { useEffect } from 'react'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibraryState {
	tracks: TrackWithPlaylist[]
  favorites: []
  setFavorites: (favorites: []) => void
	setTracks: (tracks: TrackWithPlaylist[]) => void
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: [],
  favorites: [],
	setTracks: (tracks) => set({ tracks }),
  setFavorites: (favorites) => set({ favorites }),
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						rating: currentTrack.rating === 1 ? 0 : 1,
					}
				}

				return currentTrack
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						playlist: [...(currentTrack.playlist ?? []), playlistName],
					}
				}

				return currentTrack
			}),
		})),
}))

export const useInitializeTracks = () => {
	const { fetchedTracks } = useAuth()
	const setTracks = useLibraryStore((state) => state.setTracks)

	useEffect(() => {
		if (fetchedTracks) {
			setTracks(fetchedTracks as TrackWithPlaylist[])
		}
	}, [fetchedTracks, setTracks])
}
export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useInitializeFavorites = () => {
	const { favorites } = useAuth()
  const setFavorites = useLibraryStore((state) => state.setFavorites);
  useEffect(() => {
    setFavorites(favorites);
    console.log("Set favorites as: " + favorites)
  }, [favorites, setFavorites]);
}

export const useFavorites = () => {
  const tracks = useTracks();
  const favorites = useLibraryStore((state) => state.favorites);
  const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite);

  const favoriteTracks = favorites.map((favTrackUrl) =>
    tracks.find((track) => track.url === favTrackUrl)
  );

  // console.log("Favorites tracks are: " + favorites)

  return {
    favorites: favoriteTracks,
    toggleTrackFavorite,
  };
};

export const useArtists = () =>
	useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	})

export const usePlaylists = () => {
	const playlists = useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownTrackImageUri,
					})
				}
			})

			return acc
		}, [] as Playlist[])
	})

	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	return { playlists, addToPlaylist }
}
