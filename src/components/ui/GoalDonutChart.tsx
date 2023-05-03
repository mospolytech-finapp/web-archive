import { Chart, ArcElement } from 'chart.js'
import { useEffect, useRef } from 'react'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement)

interface GoalDonutChartProps {
  percent: number
}

const GoalDonutChart = ({ percent }: GoalDonutChartProps) => {
  const chartRef = useRef<Chart<'doughnut'>>(null)

  const gradient = {
    startColor: '#02C98D',
    middleColor: '#3589D7',
    endColor: '#6C39BB'
  }

  const getGradientBackground = (canvas: HTMLCanvasElement) => {
    if (!canvas) return 'rgba(138, 138, 138, 1)'
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

    const gradientSize = canvas.width / 1.4
    const gradientObject = ctx.createLinearGradient(0, gradientSize, gradientSize, 0)

    if (gradientObject) {
      gradientObject.addColorStop(0, gradient.startColor)
      gradientObject.addColorStop(0.7, gradient.middleColor)
      gradientObject.addColorStop(1, gradient.endColor)
    }

    return gradientObject
  }

  const data = {
    datasets: [
      {
        data: [100 - percent, percent],
        backgroundColor: [
          'rgba(138, 138, 138, 1)',
          getGradientBackground(
            document.querySelector('canvas') ?? document.createElement('canvas')
          )
        ],
        borderWidth: 0
      }
    ]
  }

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: Chart) {
      const { ctx, data } = chart

      ctx.save()
      ctx.font = `bolder ${50 * (1 - (1440 - window.innerWidth) / 1440)}px Gilroy`
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        `${data.datasets[0].data[1]?.toString()}%` ?? '',
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      )
    }
  }

  const handleResize = () => {
    const responsiveSize = window.innerWidth / 5.7

    if (chartRef.current) {
      const { canvas } = chartRef.current

      if (canvas) {
        canvas.width = responsiveSize
        canvas.height = responsiveSize
        canvas.style.width = `${responsiveSize}px`
        canvas.style.height = `${responsiveSize}px`
        chartRef.current.data.datasets[0].backgroundColor = [
          'rgba(138, 138, 138, 1)',
          getGradientBackground(canvas)
        ]
        chartRef.current.resize()
      }
    }
  }

  useEffect(handleResize)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return <Doughnut ref={chartRef} data={data} plugins={[textCenter]} />
}

export default GoalDonutChart
