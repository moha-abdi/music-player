import { auth, db } from '@/configs/firebaseConfig'
import { useRootNavigation, useRouter, useSegments } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth'
import { addDoc, doc, setDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type Props = {
	children?: ReactNode
}

type RegisterResponse = {
  success: Boolean,
  data?: User,
  message?: string,
}


type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (newState: boolean) => void;
  login: (email: string, password: string) => Promise<RegisterResponse>;  // Return Promise<void>
  logout: () => Promise<void>;  // Return Promise<void>
  register: (email: string, username: string, password: string) => Promise<RegisterResponse>;
};


export const AuthContext = createContext<AuthContextType | null>(null)


export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
  const segments = useSegments()
  const router = useRouter()
  const [isNavigationReady, setIsNavigationReady] = useState(false)
  const rootNavigation = useRootNavigation()

  useEffect(() => {
    const unsub = rootNavigation?.addListener("state", (event) => {
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
        console.log("not auth")
				setIsAuthenticated(false)
				setUser(null)
			}
		})
		return unsub
	}, [user, setIsAuthenticated, setUser])

  useEffect(() => {
    const authScreen = segments[1]
    const authScreenToUse = ['signup', 'login'].includes(authScreen) ? authScreen : 'login';
    const inAuthGroup = segments[0] === "(auth)"

    if (!isNavigationReady) return
    console.log("Authentication status: "+isAuthenticated)

    if (!isAuthenticated) {
      router.replace('/' + authScreenToUse)
    } else if (isAuthenticated && inAuthGroup){
      router.replace('(songs)')
    }
}, [segments, isAuthenticated, isNavigationReady])



	const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return {success: true}

    } catch (err) {
      let error = err as FirebaseError
      let msg = error.message
      if (error.code == "auth/invalid-email") {
        msg = "Invalid Email"
      }

			return {
				success: false,
				message: msg,
			}
    }
  }

	const logout = async () => {
		try {
		} catch (err) {}
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
      if (error.code == "auth/invalid-email") {
        msg = "Invalid Email"
      }

			return {
				success: false,
				message: msg,
			}
		}
	}
	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, register }}>
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
