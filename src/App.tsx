import { Toaster } from './components/ui/Toaster'
import { AppRoutes } from './routes'

export default function App() {


  return (
    <div className="min-h-screen flex flex-col">
      
      <main className={`grow`}>
        <AppRoutes />
      </main>
      <Toaster />
    </div>
  )
}
