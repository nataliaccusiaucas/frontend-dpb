import { createContext, useContext, useState, useEffect } from 'react'
import api from '../../lib/axios'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token')
    const savedUser = localStorage.getItem('user_data')

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser) as User)
    }

    setLoading(false)
  }, [])

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })

    if (!data.token || !data.user) throw new Error("Respuesta inválida del backend")

    const userData: User = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    }

    localStorage.setItem('access_token', data.token)
    localStorage.setItem('user_data', JSON.stringify(userData))

    setToken(data.token)
    setUser(userData)
  }

  async function register(name: string, email: string, password: string, role: string) {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
      role,
    })

    if (!data.token || !data.user) throw new Error("Respuesta inválida del backend")

    const userData: User = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    }

    localStorage.setItem('access_token', data.token)
    localStorage.setItem('user_data', JSON.stringify(userData))

    setToken(data.token)
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_data')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
