import { useEffect, useState } from 'react'
import { listOffers } from './api'
import type { Offer } from './types'
import { Link } from 'react-router-dom'

export function OffersList(){
  const [items, setItems] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(()=>{ load() },[])
  async function load(){ setLoading(true); setItems(await listOffers()); setLoading(false) }

  async function onSearch(e: React.FormEvent){ e.preventDefault(); setLoading(true); setItems(await listOffers(q)); setLoading(false) }

  return (
    <section className="grid gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Offers</h1>
        <Link to="/offers/new" className="ml-auto px-3 py-1.5 rounded-md bg-blue-600 text-white">New Offer</Link>
      </div>
      <form onSubmit={onSearch} className="flex gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search…" className="flex-1 border rounded-md px-3 py-2"/>
        <button className="px-3 py-2 rounded-md border">Search</button>
      </form>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul className="grid gap-3">
          {items.map(o=> (
            <li key={o.id} className="border rounded-xl p-4 bg-white">
              <div className="flex items-start gap-4">
                <div className="font-medium text-lg">{o.title}</div>
                <div className="ml-auto text-sm text-gray-600">S/ {o.budget.toFixed(2)}</div>
              </div>
              <p className="text-gray-700 mt-1 line-clamp-2">{o.description}</p>
              <div className="mt-2">
                <Link to={`/offers/${o.id}`} className="text-blue-600 text-sm">Open</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}