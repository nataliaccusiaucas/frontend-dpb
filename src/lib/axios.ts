import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    if (
        config.url?.includes('/auth/login') ||
        config.url?.includes('/auth/register')
    ) {
        return config
    }

    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

let isRefreshing = false
let pending: Array<(token: string) => void> = []

api.interceptors.response.use(
    (r) => r,
    async (error) => {
        const original = error.config

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true
            try {
                if (!isRefreshing) {
                    isRefreshing = true
                    const refresh = localStorage.getItem('refresh_token')
                    if (!refresh) throw error

                    const { data } = await axios.post(
                        `${import.meta.env.VITE_API_URL}/auth/refresh`,
                        { refreshToken: refresh }
                    )

                    localStorage.setItem('access_token', data.accessToken)

                    pending.forEach((cb) => cb(data.accessToken))
                    pending = []
                    isRefreshing = false

                    api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
                    return api(original)
                }

                return new Promise((resolve) => {
                    pending.push((token) => {
                        original.headers.Authorization = `Bearer ${token}`
                        resolve(api(original))
                    })
                })

            } catch (e) {
                isRefreshing = false
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api