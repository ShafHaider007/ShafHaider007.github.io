const testimonials = [
  { quote: 'Built reusable Next.js mapping shells to ship proofs in weeks.', role: 'GIS Business Developer' },
  { quote: 'Benchmarked deck.gl and loaders.gl on heavy point clouds.', role: 'Team Lead' },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t py-16">
      <div className="mx-auto w-full max-w-4xl px-6">
        <h2 className="text-3xl font-semibold">Testimonials</h2>
        
        <div className="mt-8 space-y-6">
          {testimonials.map((item) => (
            <blockquote key={item.quote} className="rounded-2xl border bg-card p-6">
              <p className="text-foreground">{item.quote}</p>
              <p className="mt-4 text-sm text-muted-foreground">{item.role}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
