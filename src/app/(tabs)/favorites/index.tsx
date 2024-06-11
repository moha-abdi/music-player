import { TracksList } from '@/components/TracksList'
import { Track } from '@/components/utils/Track'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites, useInitializeFavorites } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

  useInitializeFavorites()
	const favoritesTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoritesTracks

		return favoritesTracks.filter(trackTitleFilter(search))
	}, [search, favoritesTracks])

	return (
		<View style={defaultStyles.container}>
      <View style={defaultStyles.searchBarContainer}>
        <ScrollView
          style={{ paddingHorizontal: screenPadding.horizontal }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <TracksList
            id={generateTracksListId('favorites', search)}
            scrollEnabled={false}
            isLoadingTracks={false}
            tracks={filteredFavoritesTracks as Track[]}
          />
        </ScrollView>
      </View>
		</View>
	)
}

export default FavoritesScreen
