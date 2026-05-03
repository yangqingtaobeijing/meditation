import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { timelineEvents } from '../data/history'
import Section from '../components/ui/Section'

const colorMap = {
  sand: 'bg-sand/20 border-sand/40',
  sage: 'bg-sage/20 border-sage/40',
  terracotta: 'bg-terracotta/20 border-terracotta/40',
}

const dotColorMap = {
  sand: 'bg-sand',
  sage: 'bg-sage',
  terracotta: 'bg-terracotta',
}

export default function History() {
  const { lang, t } = useLanguage()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 gradient-overlay">
        <div className="page-container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-5xl font-bold text-charcoal dark:text-white mb-4"
          >
            {t('history.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto"
          >
            {t('history.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <Section>
        <div className="page-container">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-sage/20 transform -translate-x-1/2" />

            <div className="space-y-12 md:space-y-16">
              {timelineEvents.map((event, index) => {
                const content = lang === 'zh' ? event.zh : event.en
                const isLeft = index % 2 === 0

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-white dark:border-dark-bg transform -translate-x-1/2 z-10">
                      <div className={`w-full h-full rounded-full ${dotColorMap[event.color]}`} />
                    </div>

                    {/* Year label */}
                    <div className="pl-12 md:pl-0 md:w-1/2 md:flex md:justify-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colorMap[event.color]} border`}>
                        <span className="text-lg">{event.icon}</span>
                        <span className="font-mono text-sm font-semibold text-charcoal dark:text-white">
                          {event.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pl-12 md:pl-0 md:w-1/2">
                      <div className="bg-white dark:bg-dark-card rounded-2xl border border-sage/10 p-6">
                        <h3 className="font-serif text-xl font-semibold text-charcoal dark:text-white mb-2">
                          {content.title}
                        </h3>
                        <p className="text-xs text-sage mb-3">{content.period}</p>
                        <p className="text-sm text-charcoal/70 dark:text-white/70 leading-relaxed mb-4">
                          {content.content}
                        </p>
                        <div className="space-y-1.5">
                          {content.milestones.map((milestone, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-charcoal/60 dark:text-white/60">
                              <span className="text-sage mt-0.5">•</span>
                              <span>{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
