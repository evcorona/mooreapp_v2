import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Relación del total de actividades',
    },
  },
}

interface Props {
  chartData: any
}

export function Chart(props: Props) {
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
      // {
      //   label: 'Costo total',
      //   data: props.chartData.data.map((item: any) => item.totalCost),
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
      // {
      //   label: 'Tiempo total',
      //   data: props.chartData.data.map((item: any) => item.totalTime),
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
    ],
  }
  return <Line options={options} data={data} />
}
