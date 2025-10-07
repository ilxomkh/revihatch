import Image from "next/image"

const stats = [
  { value: "10+", label: "Лет на рынке" },
  { value: "5000+", label: "Установленных люков" },
  { value: "98%", label: "Довольных клиентов" },
  { value: "24/7", label: "Поддержка" },
]

export function Statistics() {
  return (
    <section className="relative border-b border-border/40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/statistics-bg.jpg"
          alt="Современная архитектура"
          fill
          className="object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">{stat.value}</div>
                <div className="text-sm font-medium text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
