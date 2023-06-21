import _ from 'lodash'

interface Activities {
  fee: number
  timeAmmount: number
}

export default function getActivitiesTotal(activities: Activities[]) {
  const totalTime = _.reduce(
    activities,
    (sum, activity) => (sum = sum + activity.timeAmmount),
    0
  )

  let totalCost = activities.reduce(
    (acc, activity) => (acc = acc + activity.fee),
    0
  )

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
