import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { internationalLinks, chineseLinks } from '../data/links'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

function LinkCard({ link }) {
  const { lang, t } = useLanguage()
  const content = lang === 'zh' ? link.zh : link.en

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="h-full">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{link.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white group-hover:text-sage-dark dark:group-hover:text-sage-light transition-colors">
                {link.name}
              </h3>
              <ExternalLink size={14} className="text-charcoal/30 dark:text-white/30 group-hover:text-sage transition-colors" />
            </div>
            <span className="inline-block px-2 py-0.5 text-xs bg-sage/10 text-sage rounded-full mt-1">
              {content.category}
            </span>
          </div>
        </div>

        <p className="text-sm text-charcoal/70 dark:text-white/70 leading-relaxed mb-3">
          {content.description}
        </p>

        <span className="text-xs text-charcoal/40 dark:text-white/40 group-hover:text-sage transition-colors">
          {link.url}
        </span>
      </Card>
    </a>
  )
}

export default function Links() {
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
            {t('links.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto"
          >
            {t('links.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* International Links */}
      <Section>
        <div className="page-container">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-white mb-8 flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            {t('links.international')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <LinkCard link={link} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Chinese Links */}
      <Section className="bg-sage/3 dark:bg-dark-surface">
        <div className="page-container">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-white mb-8 flex items-center gap-3">
            <span className="text-2xl">🇨🇳</span>
            {t('links.chinese')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chineseLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <LinkCard link={link} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
