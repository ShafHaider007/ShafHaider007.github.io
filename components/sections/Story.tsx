import { ArrowRight, CheckCircle2, Code, Rocket, Search } from 'lucide-react'

const steps = [
  {
    phase: 'Research',
    description: 'Clarify goals and requirements',
    icon: Search,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    phase: 'Design',
    description: 'Outline system and UI structure',
    icon: CheckCircle2,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    phase: 'Development',
    description: 'Build features and pipelines',
    icon: Code,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    phase: 'Deployment',
    description: 'Ship to production',
    icon: Rocket,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
]

export function Story() {
  return (
    <section id="process" className="border-t py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Process</h2>
          <p className="mt-4 text-muted-foreground">
            From discovery to deployment in four clear stages
          </p>
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-6 md:flex-row md:justify-center">
          {steps.map((step, index) => (
            <div key={step.phase} className="flex items-center md:items-start">
              <div className="group w-full rounded-2xl border bg-card p-6 transition hover:border-primary hover:shadow-lg md:w-56">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.bgColor}`}>
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-semibold whitespace-nowrap">{step.phase}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className="mx-4 mt-12 hidden h-5 w-5 flex-shrink-0 text-primary/40 md:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border bg-secondary/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Each stage includes continuous feedback loops, ensuring alignment with your goals and delivering solutions that work.
          </p>
        </div>
      </div>
    </section>
  )
}
