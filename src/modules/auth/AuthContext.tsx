import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import api from '../../lib/axios'

interface AuthContextType {
    user: any | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string, role: string) => Promise<void>
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
            const savedRole = localStorage.getItem('user_role')
            if (savedEmail && savedRole) {
                setUser({ email: savedEmail, role: savedRole })
            }
        }

        setLoading(false)
    }, [])

    async function login(email: string, password: string) {
        const { data } = await api.post('/auth/login', { email, password })

        if (data?.token) {
            localStorage.setItem('access_token', data.token)
            localStorage.setItem('user_email', email)
            localStorage.setItem('user_role', data.role ?? 'CLIENT')
            setToken(data.token)
        }

        setUser({ email, role: data?.role })
    }

    async function register(email: string, password: string, name: string, role: string) {
        const { data } = await api.post('/auth/register', {
            name,
            email,
            password,
            role,
        })

        if (data?.token) {
            localStorage.setItem('access_token', data.token)
            localStorage.setItem('user_email', email)
            localStorage.setItem('user_role', role)
            setToken(data.token)
            setUser({ email, role })
        }
    }

    function logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_email')
        localStorage.removeItem('user_role')
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
