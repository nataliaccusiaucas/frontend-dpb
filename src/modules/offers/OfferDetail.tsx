import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOffer } from './api'
import type { Offer } from './types'

export function OfferDetail(){
    const { id } = useParams()
    const [offer, setOffer] = useState<Offer | null>(null)

    useEffect(()=>{ id && getOffer(id).then(setOffer) },[id])

    if (!offer) return <p>Loading…</p>

    return (
    <article className="max-w-2xl mx-auto bg-white border rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-semibold">{offer.title}</h1>
        <p className="text-gray-700 mt-2 whitespace-pre-line">{offer.description}</p>
        <div className="mt-3 text-sm text-gray-600">Budget: S/ {offer.budget.toFixed(2)}</div>
        <Link to="/offers" className="inline-block mt-4 text-blue-600">← Back</Link>
    </article>
    )
}