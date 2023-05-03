interface GoalProgressBarProps {
  progress: number
  progressText: string
}

const GoalProgressBar = ({ ...props }: GoalProgressBarProps) => {
  return (
    <div className="from-progressbar-nocompleted-green to-progressbar-nocompleted-black relative h-11 w-full rounded-r-3xl bg-gradient-to-r">
      <div
        className="from-progressbar-completed-green-from to-progressbar-completed-green-to flex h-full items-center justify-center rounded-r-3xl bg-gradient-to-r transition-all duration-300"
        style={{ width: `${Math.min(props.progress, 100)}%` }}
      >
        <p className="absolute left-3 text-base font-extrabold text-white">
          Осталось: {props.progressText} ₽
        </p>
      </div>
    </div>
  )
}

export default GoalProgressBar
