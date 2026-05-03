import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Section from '../components/ui/Section'

const durations = [5, 10, 15, 20, 30, 45, 60]

export default function Timer() {
  const { t } = useLanguage()
  const [selectedDuration, setSelectedDuration] = useState(10)
  const [timeLeft, setTimeLeft] = useState(10 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const intervalRef = useRef(null)
  const audioContextRef = useRef(null)

  const playBell = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(528, ctx.currentTime)
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 3)
    } catch (e) {
      console.log('Audio not supported')
    }
  }, [])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            playBell()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, timeLeft, playBell])

  const handleStart = () => {
    if (isCompleted) {
      handleReset()
      return
    }
    if (!isRunning) {
      playBell()
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsCompleted(false)
    setTimeLeft(selectedDuration * 60)
  }

  const handleDurationSelect = (minutes) => {
    if (isRunning) return
    setSelectedDuration(minutes)
    setTimeLeft(minutes * 60)
    setIsCompleted(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = 1 - timeLeft / (selectedDuration * 60)
  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="pt-20">
      <section className="py-16 md:py-24 gradient-overlay">
        <div className="page-container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-5xl font-bold text-charcoal dark:text-white mb-4"
          >
            {t('timer.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto"
          >
            {t('timer.subtitle')}
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="page-container">
          <div className="max-w-md mx-auto">
            {/* Duration Selector */}
            <div className="mb-8">
              <p className="text-sm text-charcoal/60 dark:text-white/60 text-center mb-3">
                {t('timer.selectDuration')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => handleDurationSelect(d)}
                    disabled={isRunning}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedDuration === d
                        ? 'bg-sage text-white shadow-md'
                        : 'bg-sage/10 text-sage-dark dark:text-sage-light hover:bg-sage/20'
                    } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {d} {t('timer.minutes')}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Circle */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                {/* Background circle */}
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-sage/10"
                />
                {/* Progress circle */}
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="text-sage transition-all duration-1000"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>

              {/* Time display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mb-2">
                        <Check size={32} className="text-sage" />
                      </div>
                      <span className="text-sm text-sage font-medium">
                        {t('timer.completed')}
                      </span>
                    </motion.div>
                  ) : (
                    <span className="font-mono text-5xl font-light text-charcoal dark:text-white">
                      {formatTime(timeLeft)}
                    </span>
                  )}
                </div>
              </div>

              {/* Breathing animation when running */}
              {isRunning && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-sage/20 breathing" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="p-4 rounded-full bg-sage/10 text-sage-dark dark:text-sage-light hover:bg-sage/20 transition-colors"
                title={t('timer.reset')}
              >
                <RotateCcw size={20} />
              </button>

              <button
                onClick={handleStart}
                className="p-6 rounded-full bg-sage text-white hover:bg-sage-dark transition-colors shadow-lg hover:shadow-xl"
                title={isRunning ? t('timer.pause') : t('timer.start')}
              >
                {isRunning ? <Pause size={28} /> : <Play size={28} />}
              </button>

              <div className="w-12" /> {/* Spacer for centering */}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
