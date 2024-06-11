import { auth, db } from '@/configs/firebaseConfig'
import { TrackWithPlaylist } from '@/helpers/types'
import { useRootNavigation, useRouter, useSegments } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	User,
  signOut
} from 'firebase/auth'
import {
	QuerySnapshot,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	setDoc,
  where,
} from 'firebase/firestore'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type Props = {
	children?: ReactNode
}

type RegisterResponse = {
	success: Boolean
	data?: User
	message?: string
}

type AuthContextType = {
	isAuthenticated: boolean
	setIsAuthenticated: (newState: boolean) => void
	login: (email: string, password: string) => Promise<RegisterResponse> // Return Promise<void>
	logout: () => Promise<RegisterResponse> // Return Promise<void>
	register: (email: string, username: string, password: string) => Promise<RegisterResponse>
	fetchedTracks: TrackWithPlaylist[]
	isLoadingTracks: boolean
	addTrackToFavorites: (trackid: string) => Promise<RegisterResponse>
  removeTrackFromFavorites: (trackid: string) => Promise<RegisterResponse>
  favorites: string[]
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const segments = useSegments()
	const router = useRouter()
	const [isNavigationReady, setIsNavigationReady] = useState(false)
	const rootNavigation = useRootNavigation()
	const [fetchedTracks, setTracks] = useState<TrackWithPlaylist[]>([])
	const [isLoadingTracks, setIsLoadingTracks] = useState(false)
	const [favorites, setFavorites] = useState<string[]>([])

	useEffect(() => {
		const unsub = rootNavigation?.addListener('state', (event) => {
			setIsNavigationReady(true)
		})

		return function cleanup() {
			if (unsub) {
				unsub()
			}
		}
	}, [rootNavigation, setIsNavigationReady])

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user.email)
				setIsAuthenticated(true)
				setUser(user)
			} else {
				console.log('not authenticated')
				setIsAuthenticated(false)
				setUser(null)
			}
		})
		return unsub
	}, [user, setIsAuthenticated, setUser])

	useEffect(() => {
		// Fetch tracks data from a single collection
		setIsLoadingTracks(true)
		const tracksRef = collection(db, 'tracks')
		console.log('Fetching tracks...')
		const tracksQuery = query(tracksRef, orderBy('title', 'asc'))
		const unsubscribe = onSnapshot(tracksQuery, (querySnap: QuerySnapshot) => {
			const tracksData = querySnap.docs.map((doc) => ({
				id: doc.id,
				...(doc.data() as TrackWithPlaylist),
			}))
			console.log('Tracks.data = ' + tracksData)
			setTracks(tracksData as TrackWithPlaylist[]) // Update the tracks state with fetched data
			setIsLoadingTracks(false)
		})

		return unsubscribe
	}, [user])

	useEffect(() => {
		const authScreen = segments[1]
		const authScreenToUse = ['signup', 'login'].includes(authScreen) ? authScreen : 'login'
		const inAuthGroup = segments[0] === '(auth)'

		if (!isNavigationReady) return
		console.log('Authentication status: ' + isAuthenticated)

		if (!isAuthenticated) {
			router.replace('/' + authScreenToUse)
		} else if (isAuthenticated && inAuthGroup) {
			router.replace('(songs)')
		}
	}, [segments, isAuthenticated, isNavigationReady])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.uid) return
      const userDocRef = doc(db, 'users', user.uid);
      const favoritesRef = collection(userDocRef, 'favorites');
      const snapshot = await getDocs(favoritesRef);
      const favorites = snapshot.docs.map((doc) => doc.data().trackUrl);
      setFavorites(favorites as [])
      console.log("favorites are: " +favorites)
    };

      fetchFavorites();
    }, [user, setTracks]);

	const login = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
			return { success: true }
		} catch (err) {
			let error = err as FirebaseError
			let msg = error.message
			if (error.code == 'auth/invalid-email') {
				msg = 'Invalid Email'
			}

			return {
				success: false,
				message: msg,
			}
		}
	}

	const logout = async () => {
		try {
      await signOut(auth)
      return { success: true}
		} catch (err) {
      console.log("Error in singout: ", (err as Error).message)
      return {success: false}
    }
	}

	const register = async (email: string, username: string, password: string) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			console.log('response.?user: ' + response?.user)

			await setDoc(doc(db, 'users', response?.user?.uid), {
				username,
				userId: response?.user?.uid,
			})

			return { success: true, data: response?.user }
		} catch (err) {
			let error = err as FirebaseError
			let msg = error.name
			if (error.code == 'auth/invalid-email') {
				msg = 'Invalid Email'
			}

			return {
				success: false,
				message: msg,
			}
		}
	}

	const addTrackToFavorites = async (trackUrl: string) => {
    try {
      if (!user?.uid) return { success: false }
      const userdocRef = doc(db, 'users', user.uid);
      const favroritesCollectionRef = collection(userdocRef, 'favorites');
      const newFavoriteDocRef = doc(favroritesCollectionRef);
      await setDoc(newFavoriteDocRef, { trackUrl });
      setFavorites((prevFavorites) => [...prevFavorites, trackUrl]); // Update local state
      return { success: true };
    } catch (err) {
      console.error("Can't add to favorites: " + (err as Error).message);
      return { success: false };
    }
  };

  // Firestore function to remove a track from favorites
  const removeTrackFromFavorites = async (trackUrl: string) => {
    try {
      if (!user?.uid) return { success: false }
      const userDocRef = doc(db, 'users', user.uid);
      const favoritesCollectionRef = collection(userDocRef, 'favorites');
      const q = query(favoritesCollectionRef, where('trackUrl', '==', trackUrl));
      const querySnapshot = await getDocs(q);
      console.log("Remov q get: " + querySnapshot)
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setFavorites((prevFavorites) => prevFavorites.filter((url) => url !== trackUrl)); // Update local state
      return { success: true };
    } catch (err) {
      console.error("Can't remove from favorites: " + (err as Error).message);
      return { success: false };
    }
  };

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				login,
				logout,
				register,
				fetchedTracks,
				isLoadingTracks,
				addTrackToFavorites,
        removeTrackFromFavorites,
        favorites
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const value = useContext(AuthContext)
	if (!value) {
		throw new Error('useAuth called from outside of AuthContextProvider')
	}
	return value
}
