import { useAuthRequired } from "../modules/auth/useAuthRequired"
import { useAuth } from "../modules/auth/AuthContext"
import { useToast } from "../components/ui/Toaster"
import { uploadAvatar } from "../modules/auth/api"
import { useState } from "react"

export function UserProfilePage() {
  const user = useAuthRequired()
  const { updateUser } = useAuth()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(user.avatarUrl ?? null)
  const [uploading, setUploading] = useState(false)

  if (!user) return <p className="text-center mt-20">Cargando...</p>

  async function handleUpload() {
    if (!file) {
      toast("Selecciona una imagen primero")
      return
    }

    try {
      setUploading(true)
      const { avatarUrl } = await uploadAvatar(user.id, file)
      updateUser({ ...user, avatarUrl })
      setPreview(avatarUrl)
      toast("Avatar actualizado")
    } catch (e) {
      console.error(e)
      toast("No se pudo subir el avatar")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white/80 rounded-3xl border border-[#00E8FF]/20">
      <h1 className="text-3xl font-title text-[#070707]">Mi Perfil</h1>

      <div className="mt-5 flex items-center gap-4">
        <img
          src={preview || "/placeholder-avatar.png"}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border border-[#00E8FF]/40"
        />
        <div className="space-y-2">
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00E8FF]/40 text-[#004F62] cursor-pointer bg-white hover:bg-[#E4FCFF] transition">
            <span>Seleccionar imagen</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const next = e.target.files?.[0] || null
                setFile(next)
                if (next) setPreview(URL.createObjectURL(next))
              }}
            />
          </label>
          {file && (
            <p className="text-xs text-[#004F62]/80">
              Seleccionado: {file.name}
            </p>
          )}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 rounded-lg bg-[#00E8FF] text-[#070707] font-semibold disabled:opacity-50"
          >
            {uploading ? "Subiendo..." : "Guardar avatar"}
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-[#004F62]">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    </div>
  )
}
