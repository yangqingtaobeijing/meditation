import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { path: '/history', key: 'history' },
    { path: '/schools', key: 'schools' },
    { path: '/methods', key: 'methods' },
    { path: '/courses', key: 'courses' },
    { path: '/links', key: 'links' },
    { path: '/timer', key: 'timer' },
  ]

  return (
    <footer className="bg-sage/5 dark:bg-dark-surface border-t border-sage/10 mt-auto">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full border-2 border-sage flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-sage/60" />
              </div>
              <span className="font-serif text-lg font-semibold text-charcoal dark:text-white">
                {t('footer.desc').split('，')[0]}
              </span>
            </div>
            <p className="text-sm text-charcoal/60 dark:text-white/60 max-w-xs">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-charcoal dark:text-white mb-4">
              {t('footer.quickLinks')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-charcoal/60 dark:text-white/60 hover:text-sage-dark dark:hover:text-sage-light transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div>
            <h3 className="font-serif font-semibold text-charcoal dark:text-white mb-4">
              {t('footer.resources')}
            </h3>
            <p className="text-sm text-charcoal/60 dark:text-white/60 italic">
              "The mind is everything. What you think you become."
            </p>
            <p className="text-xs text-charcoal/40 dark:text-white/40 mt-2">
              — Buddha
            </p>
          </div>
        </div>

        <div className="border-t border-sage/10 mt-8 pt-8 flex items-center justify-center gap-1 text-sm text-charcoal/50 dark:text-white/50">
          <span>{t('footer.copyright')}</span>
          <Heart size={14} className="text-terracotta" />
        </div>
      </div>
    </footer>
  )
}
