import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { History, BookOpen, Compass, GraduationCap, Link2, Timer, ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { quotes } from '../data/quotes'
import { faq } from '../data/faq'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

const featureCards = [
  { path: '/history', icon: History, key: 'history', color: 'bg-sand/20' },
  { path: '/schools', icon: BookOpen, key: 'schools', color: 'bg-sage/20' },
  { path: '/methods', icon: Compass, key: 'methods', color: 'bg-terracotta/20' },
  { path: '/courses', icon: GraduationCap, key: 'courses', color: 'bg-sage/20' },
  { path: '/links', icon: Link2, key: 'links', color: 'bg-sand/20' },
  { path: '/timer', icon: Timer, key: 'timer', color: 'bg-terracotta/20' },
]

function DailyQuote() {
  const { lang } = useLanguage()
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const day = new Date().getDate()
    setQuoteIndex(day % quotes.length)
  }, [])

  const quote = quotes[quoteIndex]

  return (
    <div className="text-center py-8">
      <div className="inline-block p-8 rounded-2xl bg-sage/5 dark:bg-dark-surface border border-sage/10 max-w-lg">
        <p className="text-xs text-sage uppercase tracking-widest mb-4">
          {lang === 'zh' ? '每日一言' : 'Daily Wisdom'}
        </p>
        <p className="font-serif text-xl md:text-2xl text-charcoal dark:text-white leading-relaxed mb-4">
          "{lang === 'zh' ? quote.zh : quote.en}"
        </p>
        <p className="text-sm text-charcoal/50 dark:text-white/50">
          — {quote.author}
        </p>
      </div>
    </div>
  )
}

function FAQItem({ item }) {
  const { lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const content = lang === 'zh' ? item.zh : item.en

  return (
    <div className="border border-sage/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-sage/5 transition-colors"
      >
        <span className="font-medium text-charcoal dark:text-white pr-4">
          {content.question}
        </span>
        {isOpen ? (
          <ChevronUp size={18} className="text-sage flex-shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-charcoal/40 dark:text-white/40 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-5 pb-5"
        >
          <p className="text-charcoal/70 dark:text-white/70 leading-relaxed">
            {content.answer}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default function Home() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-sage/5 breathing" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-sand/10 breathing" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full border-3 border-sage/40 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-sage/30 breathing" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal dark:text-white mb-6"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/history"
              className="px-8 py-3 bg-sage text-white rounded-full hover:bg-sage-dark transition-colors font-medium"
            >
              {t('hero.startBtn')}
            </Link>
            <Link
              to="/timer"
              className="px-8 py-3 border-2 border-sage text-sage dark:text-sage-light rounded-full hover:bg-sage/10 transition-colors font-medium"
            >
              {t('hero.timerBtn')}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={24} className="text-charcoal/30 dark:text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* Daily Quote */}
      <Section>
        <div className="page-container">
          <DailyQuote />
        </div>
      </Section>

      {/* Feature Cards */}
      <Section className="bg-sage/3 dark:bg-dark-surface">
        <div className="page-container">
          <h2 className="section-title text-center text-charcoal dark:text-white">
            {t('features.title')}
          </h2>
          <p className="section-subtitle text-center">
            {t('features.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={card.path}>
                  <Card className="h-full group cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <card.icon size={24} className="text-sage-dark dark:text-sage-light" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white mb-2">
                      {t(`features.${card.key}.title`)}
                    </h3>
                    <p className="text-sm text-charcoal/60 dark:text-white/60">
                      {t(`features.${card.key}.desc`)}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="page-container">
          <h2 className="section-title text-center text-charcoal dark:text-white">
            {t('faq.title')}
          </h2>
          <p className="section-subtitle text-center">
            {t('faq.subtitle')}
          </p>

          <div className="max-w-3xl mx-auto space-y-3">
            {faq.map((item) => (
              <FAQItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
