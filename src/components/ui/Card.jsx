export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`bg-white dark:bg-dark-card rounded-2xl border border-sage/10 p-6 ${
        hover ? 'card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
