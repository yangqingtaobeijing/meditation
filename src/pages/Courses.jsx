import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, BookOpen, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { courses } from '../data/courses'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

const levelColors = {
  beginner: 'from-sage/20 to-sage/5 border-sage/30',
  intermediate: 'from-sand/20 to-sand/5 border-sand/30',
  advanced: 'from-terracotta/20 to-terracotta/5 border-terracotta/30',
}

const levelIconColors = {
  beginner: 'bg-sage/20 text-sage-dark',
  intermediate: 'bg-sand/30 text-terracotta',
  advanced: 'bg-terracotta/20 text-terracotta',
}

function CourseCard({ course }) {
  const { lang, t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const content = lang === 'zh' ? course.zh : course.en

  return (
    <Card hover={false} className="h-full">
      <div className={`rounded-xl bg-gradient-to-br ${levelColors[course.level]} p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg ${levelIconColors[course.level]} flex items-center justify-center`}>
            <span className="text-xl">{course.icon}</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-charcoal dark:text-white">
              {content.name}
            </h3>
            <p className="text-xs text-charcoal/50 dark:text-white/50">
              {t(`courses.level`)}: {t(`courses.${course.level}`)}
            </p>
          </div>
        </div>

        <p className="text-sm text-charcoal/70 dark:text-white/70 leading-relaxed mb-4">
          {content.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-charcoal/50 dark:text-white/50">
          <span className="flex items-center gap-1">
            <BookOpen size={14} />
            {course.totalLessons} {t('courses.lessons')}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {course.totalDuration}
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-sm text-sage hover:text-sage-dark transition-colors w-full text-left"
      >
        {t('courses.lessons_title')}
        <ChevronDown
          size={16}
          className={`transition-transform ml-auto ${isExpanded ? 'rotate-180' : ''}`}
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
            <div className="pt-4 space-y-3">
              {content.lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-sage/5 transition-colors"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage/10 text-sage text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-charcoal dark:text-white">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-charcoal/50 dark:text-white/50 mt-0.5">
                      {lesson.desc}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-charcoal/40 dark:text-white/40">
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function Courses() {
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
            {t('courses.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto"
          >
            {t('courses.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Courses */}
      <Section>
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
