export function Dashboard() {
  return (
    <div className="pt-4">
      <h1 className="text-3xl font-semibold text-[#E4FCFF] mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 rounded-2xl 
          bg-white/10 backdrop-blur-xl border border-white/20 text-[#E4FCFF]">
          <h2 className="text-xl font-bold">Requests</h2>
          <p className="text-gray-300">Crea, revisa y administra tus solicitudes.</p>
        </div>

        <div className="p-6 rounded-2xl 
          bg-white/10 backdrop-blur-xl border border-white/20 text-[#E4FCFF]">
          <h2 className="text-xl font-bold">Offers</h2>
          <p className="text-gray-300">Ofertas enviadas y recibidas.</p>
        </div>

        <div className="p-6 rounded-2xl 
          bg-white/10 backdrop-blur-xl border border-white/20 text-[#E4FCFF]">
          <h2 className="text-xl font-bold">Profile</h2>
          <p className="text-gray-300">Completa tu perfil para destacar.</p>
        </div>

      </div>
    </div>
  )
}
