import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Section({ children, className = '', id }) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}
