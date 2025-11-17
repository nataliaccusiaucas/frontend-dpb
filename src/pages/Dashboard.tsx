import { Link } from 'react-router-dom'

export function Dashboard() {
  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-semibold text-[#004F62]">
        Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          title="Offers" 
          description="Explora y crea ofertas" 
          to="/offers" 
        />
        <Card 
          title="Job Requests" 
          description="Crea una solicitud y encuentra al profesional ideal" 
          to="/jobrequests" 
        />
        <Card 
          title="Commissions" 
          description="Consulta los cargos de servicio" 
          to="#" 
        />
      </div>
    </section>
  )
}

function Card({
  title,
  description,
  to
}: {
  title: string
  description: string
  to: string
}) {
  const isLink = to !== '#'
  const Wrapper: any = isLink ? Link : 'div'

  return (
    <Wrapper
      to={to}
      className="
        block rounded-2xl p-5 bg-white
        border border-[#E4FCFF]
        shadow-sm
        hover:shadow-md hover:border-[#00E8FF]
        transition-all duration-200
      "
    >
      <div className="text-lg font-semibold text-[#004F62] mb-1">
        {title}
      </div>

      <p className="text-sm text-gray-600 leading-snug">
        {description}
      </p>
    </Wrapper>
  )
}
