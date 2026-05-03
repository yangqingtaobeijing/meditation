import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, BarChart3 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { methods } from '../data/methods'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

const difficultyColors = {
  beginner: 'bg-sage/20 text-sage-dark dark:text-sage-light',
  intermediate: 'bg-sand/30 text-terracotta',
  advanced: 'bg-terracotta/20 text-terracotta',
}

function MethodCard({ method }) {
  const { lang, t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const content = lang === 'zh' ? method.zh : method.en

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{method.icon}</span>
          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white">
              {content.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 text-xs rounded-full ${difficultyColors[method.difficulty]}`}>
                {t(`methods.${method.difficulty}`)}
              </span>
              <span className="flex items-center gap-1 text-xs text-charcoal/50 dark:text-white/50">
                <Clock size={12} />
                {method.duration} {t('methods.minutes')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-charcoal/70 dark:text-white/70 leading-relaxed mb-4">
        {content.description}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-sm text-sage hover:text-sage-dark transition-colors mb-3"
      >
        {t('methods.steps')}
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
            <div className="pt-3 border-t border-sage/10">
              <ol className="space-y-3">
                {content.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage/10 text-sage text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-charcoal/70 dark:text-white/70 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {content.tips && (
                <div className="mt-4 p-3 bg-sand/10 rounded-xl">
                  <p className="text-xs text-charcoal/60 dark:text-white/60">
                    <span className="font-semibold text-terracotta">💡 </span>
                    {content.tips}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function Methods() {
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
            {t('methods.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto"
          >
            {t('methods.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Methods Grid */}
      <Section>
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MethodCard method={method} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
