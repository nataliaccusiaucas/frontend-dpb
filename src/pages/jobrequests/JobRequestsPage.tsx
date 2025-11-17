import { useEffect, useState } from "react"
import { listJobRequests } from "../../lib/api-jobrequests"

export function JobRequestsPage() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    listJobRequests().then(setRequests)
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Job Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No hay solicitudes aún.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((r: any) => (
            <div key={r.id} className="border rounded-lg p-4 shadow">
              <h2 className="font-bold">{r.title}</h2>
              <p className="text-gray-700">{r.description}</p>
              <p className="text-sm text-gray-500">
                Categoría: {r.category} — Presupuesto: S/{r.budget}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
