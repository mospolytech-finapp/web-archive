import { useEffect, useState } from 'react'

interface GoalProgressBarProps {
  progress: number
  progressText: string
}

const GoalProgressBar = ({ progress, progressText }: GoalProgressBarProps) => {
  const [width, setWidth] = useState(Math.min(progress, 100))

  useEffect(() => {
    setWidth(Math.min(progress, 100))
  }, [progress])

  return (
    <div className="from-progressbar-nocompleted-green to-progressbar-nocompleted-black relative h-11 w-full rounded-r-3xl bg-gradient-to-r">
      <div
        className="from-progressbar-completed-green-from to-progressbar-completed-green-to flex h-full items-center justify-center rounded-r-3xl bg-gradient-to-r transition-all duration-300"
        style={{ width: `${width}%` }}
      >
        <p className="absolute left-3 text-base font-extrabold text-white">
          Осталось: {progressText} ₽
        </p>
      </div>
    </div>
  )
}

export default GoalProgressBar
