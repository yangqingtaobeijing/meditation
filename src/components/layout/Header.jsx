import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const navItems = [
  { path: '/', key: 'home' },
  { path: '/history', key: 'history' },
  { path: '/schools', key: 'schools' },
  { path: '/methods', key: 'methods' },
  { path: '/courses', key: 'courses' },
  { path: '/links', key: 'links' },
  { path: '/timer', key: 'timer' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full border-2 border-sage flex items-center justify-center group-hover:border-sage-dark transition-colors">
              <div className="w-3 h-3 rounded-full bg-sage/60 group-hover:bg-sage transition-colors" />
            </div>
            <span className="font-serif text-lg font-semibold text-charcoal dark:text-white">
              {lang === 'zh' ? '冥想之旅' : 'Meditation'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-sage/10 text-sage-dark dark:text-sage-light font-medium'
                    : 'text-charcoal/70 dark:text-white/70 hover:text-sage-dark dark:hover:text-sage-light hover:bg-sage/5'
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg hover:bg-sage/10 transition-colors text-charcoal/70 dark:text-white/70"
              title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              <Globe size={18} />
              <span className="sr-only">{lang === 'zh' ? 'EN' : '中'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-sage/10 transition-colors text-charcoal/70 dark:text-white/70"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-sage/10 transition-colors text-charcoal/70 dark:text-white/70"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-bg border-t border-sage/10"
          >
            <nav className="page-container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'bg-sage/10 text-sage-dark dark:text-sage-light font-medium'
                      : 'text-charcoal/70 dark:text-white/70 hover:bg-sage/5'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
