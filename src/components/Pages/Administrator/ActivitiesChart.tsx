import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import NoResultsCard from '../../NoResultsCard'
import _ from 'lodash'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const options = {
  updateMode: 'resize',
  redraw: true,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Relación de actividades',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

interface Props {
  chartData: any
}

export default function ActivitiesChart(props: Props) {
  if (!props.chartData) return
  if (!props.chartData.data) return

  const data = {
    labels: props.chartData.labels,
    datasets: [
      {
        label: 'Numero de actividades',
        data: props.chartData.data.map((item: any) => item.totalActivities),
        borderColor: '#29aae1',
        backgroundColor: '#29aae1',
      },
    ],
  }
  return (
    <>
      {_.isEmpty(props.chartData.data) && <NoResultsCard />}
      {!_.isEmpty(props.chartData.data) && (
        <Bar options={options} data={data} />
      )}
    </>
  )
}
