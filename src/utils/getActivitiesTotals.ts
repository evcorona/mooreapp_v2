import { ActivitiesData } from '~/types/objects'
import _ from 'lodash'

export default function getActivitiesTotal(activities: ActivitiesData[]) {
  const totalTime = _.reduce(
    activities,
    (sum, activity) => (sum = sum + activity.timeAmmount),
    0
  )

  let totalCost = activities.reduce((acc, activity) => {
    const { fee = 0 } = activity
    return (acc = acc + fee)
  }, 0)

  return {
    totalTime: `${totalTime.toLocaleString('es-MX', {
      useGrouping: true,
      minimumFractionDigits: 2,
    })}
     horas`,
    totalCost: `$ ${totalCost.toLocaleString('es-MX', {
      useGrouping: true,
      minimumFractionDigits: 2,
    })}`,
  }
}
