import api from '../../lib/axios'

export async function login(data: { email: string; password: string }) {
    const { data: response } = await api.post('/auth/login', data)
    return response
}

export async function register(data: {
    name: string
    email: string
    password: string
    phone?: string
}) {

    const payload = { ...data, role: 'CLIENT' }

    const { data: response } = await api.post('/auth/register', payload)
    return response
}

export async function refreshToken(refreshToken: string) {
    const { data: response } = await api.post('/auth/refresh', { refreshToken })
    return response
}
