import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { easternSchools, westernSchools } from '../data/schools'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

function SchoolCard({ school }) {
  const { lang, t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const content = lang === 'zh' ? school.zh : school.en

  return (
    <Card className="h-full">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">{school.icon}</span>
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white">
            {content.name}
          </h3>
          <p className="text-xs text-sage">{content.origin}</p>
        </div>
      </div>

      <p className="text-sm text-charcoal/70 dark:text-white/70 leading-relaxed mb-4">
        {content.philosophy}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-sm text-sage hover:text-sage-dark transition-colors mb-3"
      >
        {t('schools.learnMore')}
        <ChevronDown
          size={16}
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-3 border-t border-sage/10">
              <div>
                <h4 className="text-xs font-semibold text-sage uppercase tracking-wide mb-1.5">
                  {t('schools.techniques')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {content.techniques.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-sage/10 text-sage-dark dark:text-sage-light rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-sage uppercase tracking-wide mb-1.5">
                  {t('schools.benefits')}
                </h4>
                <ul className="space-y-1">
                  {content.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-xs text-charcoal/60 dark:text-white/60"
                    >
                      <span className="text-sage mt-0.5">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-sage uppercase tracking-wide mb-1.5">
                  {t('schools.suitableFor')}
                </h4>
                <p className="text-xs text-charcoal/60 dark:text-white/60">
                  {content.suitableFor}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function Schools() {
  const { t } = useLanguage()

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
            {t('schools.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto"
          >
            {t('schools.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Eastern Schools */}
      <Section>
        <div className="page-container">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-white mb-8 flex items-center gap-3">
            <span className="text-2xl">🏮</span>
            {t('schools.eastern')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {easternSchools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SchoolCard school={school} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Western Schools */}
      <Section className="bg-sage/3 dark:bg-dark-surface">
        <div className="page-container">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-white mb-8 flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            {t('schools.western')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {westernSchools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SchoolCard school={school} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
