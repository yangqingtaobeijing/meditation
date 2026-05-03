import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import History from './pages/History'
import Schools from './pages/Schools'
import Methods from './pages/Methods'
import Courses from './pages/Courses'
import Links from './pages/Links'
import Timer from './pages/Timer'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
            <Route path="/schools" element={<PageWrapper><Schools /></PageWrapper>} />
            <Route path="/methods" element={<PageWrapper><Methods /></PageWrapper>} />
            <Route path="/courses" element={<PageWrapper><Courses /></PageWrapper>} />
            <Route path="/links" element={<PageWrapper><Links /></PageWrapper>} />
            <Route path="/timer" element={<PageWrapper><Timer /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  )
}
