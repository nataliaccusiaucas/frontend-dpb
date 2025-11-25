import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import api from '../../lib/axios'

interface AuthContextType {
    user: any | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<any | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem('access_token')

        if (savedToken) {
            setToken(savedToken)
            const savedEmail = localStorage.getItem('user_email')
            if (savedEmail) {
                setUser({ email: savedEmail })
            }
        }

        setLoading(false)
    }, [])

    async function login(email: string, password: string) {
        const { data } = await api.post('/auth/login', { email, password })

        if (data?.token) {
            localStorage.setItem('access_token', data.token)
            localStorage.setItem('user_email', email)
            setToken(data.token)
        }

        setUser({ email })
    }

    async function register(email: string, password: string, name: string) {
        await api.post('/auth/register', {
            name,
            email,
            password,
            role: 'CLIENT',
        })
    }

    function logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_email')
        setUser(null)
        setToken(null)
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
