import { useEffect, useState } from 'react'

type Toast = { id: number; title: string; }

let pushToast: ((title: string) => void) | null = null
export function useToast(){
    return {
    toast: (title: string)=> pushToast && pushToast(title)
    }
}

export function Toaster(){
    const [items, setItems] = useState<Toast[]>([])
    useEffect(()=>{
    pushToast = (title: string)=>{
        const id = Date.now()
        setItems((arr)=>[...arr,{id,title}])
        setTimeout(()=> setItems((arr)=>arr.filter(t=>t.id!==id)), 2500)
    }
    },[])
    return (
    <div className="fixed bottom-4 right-4 space-y-2">
        {items.map(t=> (
        <div key={t.id} className="px-3 py-2 rounded-md shadow bg-gray-900 text-white text-sm">{t.title}</div>
        ))}
    </div>
    )
}