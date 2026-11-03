import { CountUp, Reveal } from '@/components/motion/Reveal'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHead } from '@/components/SectionHead'
import { Experience } from '@/components/home/Experience'
import { Hero } from '@/components/home/Hero'
import { Education, Methods } from '@/components/home/Methods'
import { Questions } from '@/components/home/Questions'
import { projects } from '@/lib/projects'
import { education, facts, profile } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Facts */}
      <section className="border-y border-line bg-surface">
        <Reveal as="dl" stagger="[data-fact]" className="page grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              data-fact
              className={`py-8 pr-4 md:py-10 ${i % 2 === 1 ? 'border-l border-line pl-5' : ''} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-5' : ''}`}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-[2rem] leading-none tracking-tight text-ink md:text-[2.5rem]">
                {f.count ? <CountUp value={f.value} /> : f.value}
              </dd>
              <dd className="mt-3 max-w-[15rem] text-[13.5px] leading-snug text-ink-2">{f.label}</dd>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Work */}
      <section id="work" className="page pt-20 md:pt-28">
        <SectionHead index="01" title="Selected work">
          Each project starts with a question. The case studies explain the question, my part in the work, and how the
          analysis was done, with figures recomputed from open data.
        </SectionHead>
        <div className="border-b border-line pb-16">
          <ProjectCard project={projects[0]} index={0} large />
        </div>
        <div className="grid gap-x-10 gap-y-16 pt-14 md:grid-cols-2">
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </section>

      {/* Research questions */}
      <section id="research" className="page pt-24 md:pt-32">
        <SectionHead index="02" title="Questions I want to study">
          Project work has deadlines and a fixed scope. Each of these projects left me with a question I could not answer
          inside it. These are the questions I want to take into graduate research.
        </SectionHead>
        <Questions />
      </section>

      {/* Experience */}
      <section id="experience" className="page pt-24 md:pt-32">
        <SectionHead index="03" title="Experience" />
        <Experience />
      </section>

      {/* Methods and tools */}
      <section id="skills" className="page pt-24 md:pt-32">
        <SectionHead index="04" title="Methods and tools">
          Where each method was used. Select a project name to see the work.
        </SectionHead>
        <Methods />
      </section>

      {/* Education */}
      <section id="education" className="page pt-24 md:pt-32">
        <SectionHead index="05" title="Education" />
        <Education education={education} />
      </section>

      {/* Contact */}
      <section id="contact" className="page pb-24 pt-24 md:pb-32 md:pt-32">
        <SectionHead index="06" title="Contact" />
        <div className="grid gap-10 md:grid-cols-[12rem_1fr] md:gap-8">
          <div />
          <Reveal stagger="[data-c]">
            <p data-c className="max-w-2xl text-[1.075rem] leading-relaxed text-ink-2">
              I am applying to graduate programs in geography. If you work on land change, forest carbon, drylands or
              urban heat, I would be glad to hear from you.
            </p>
            <a
              data-c
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block break-all font-serif text-[1.7rem] leading-tight text-ink underline decoration-accent decoration-2 underline-offset-[0.2em] transition-colors hover:text-accent-ink sm:text-[2.6rem]"
            >
              {profile.email}
            </a>
            <ul data-c className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="link text-ink">
                    {l.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.cv} download className="link text-ink">
                  Download CV (.docx)
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
