import api from '../../lib/axios'
import type { Offer } from './types'

export async function listOffers(query?: string): Promise<Offer[]> {
    const { data } = await api.get('/offers', { params: { q: query } })
    return data
}
export async function getOffer(id: string): Promise<Offer> {
    const { data } = await api.get(`/offers/${id}`)
    return data
}
export async function createOffer(input: Omit<Offer,'id'|'createdAt'>): Promise<Offer> {
    const { data } = await api.post('/offers', input)
    return data
}