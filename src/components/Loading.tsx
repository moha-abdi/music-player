import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import LoadingJSON from '@/assets/loading.json'

type LoadingProps = {
	size: number
}
export default function Loading({ size }: LoadingProps) {
	return (
		<View style={{ height: size, aspectRatio: 1 }}>
			<LottieView style={{ flex: 1 }} source={LoadingJSON} autoPlay loop />
		</View>
	)
}
