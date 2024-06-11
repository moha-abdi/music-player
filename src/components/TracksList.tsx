import { TracksListItem } from '@/components/TracksListItem'
import { unknownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { useRef } from 'react'
import { StyleSheet, ActivityIndicator, FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import { QueueControls } from './QueueControls'
import Loading from './Loading'
import { colors, fontSize } from '@/constants/tokens'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
  isLoadingTracks: boolean
	hideQueueControls?: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({
	id,
	tracks,
  isLoadingTracks,
	hideQueueControls = false,
	...flatlistProps
}: TracksListProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)

			await TrackPlayer.reset()

			// we construct the new queue
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? tracks.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current

			await TrackPlayer.skip(nextTrackIndex)
			TrackPlayer.play()
		}
	}

  if (isLoadingTracks) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50, paddingTop: 128 }}>
        <View style={styles.loadingContainer}>
          <Loading size={150}/>
        </View>
        <Text style={styles.loadingContentText}>Fetching tracks...</Text>
      </View>
    );
  }

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListHeaderComponent={
				!hideQueueControls ? (
					<QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
				) : undefined
			}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No songs found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			renderItem={({ item: track }) => (
				<TracksListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: 80,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 3,
    marginTop: 16,
    width: '100%',
  },
  loadingContentText: {
    fontSize: fontSize.base,
		color: colors.textMuted,
		textAlign: 'center',
	},

})
