import { useAuthRequired } from "../modules/auth/useAuthRequired"

export function UserProfilePage() {
  const user  = useAuthRequired()

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white/80 rounded-3xl border border-[#00E8FF]/20">
      <h1 className="text-3xl font-title text-[#070707]">Mi Perfil</h1>

      <div className="mt-5 space-y-3 text-[#004F62]">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    </div>
  )
}
