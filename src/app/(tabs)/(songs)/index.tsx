import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { useAuth } from '@/context/AuthContext'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useInitializeTracks, useTracks } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	useInitializeTracks()
  const tracks = useTracks()
  const { isLoadingTracks } = useAuth()

	const filteredTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

  console.log("Type of tracks is: " + typeof tracks)

	return (
		<View style={defaultStyles.container}>
      <View style={defaultStyles.searchBarContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ paddingHorizontal: screenPadding.horizontal }}
        >
          <TracksList
            id={generateTracksListId('songs', search)}
            isLoadingTracks={isLoadingTracks}
            tracks={filteredTracks}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
		</View>
	)
}

export default SongsScreen
