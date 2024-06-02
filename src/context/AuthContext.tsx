import { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
	children?: ReactNode
}

const defaultValues = {
	isAuthenticated: false,
	setIsAuthenticated: (newstate: boolean) => {},
}

export const AuthContext = createContext(defaultValues)

export const AuthContextProvider = ({ children }: Props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (username: string, password: string) => {
    
  }

  const logout = async () => {
    try {
      
    } catch (err) {

    }
  }

  const register = async (email: string, password: string, username: string) => {
    try {

    } catch (err) {

    }
  }
	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error("useAuth called from outside of AuthContextProvider")
  }
  return value
}
