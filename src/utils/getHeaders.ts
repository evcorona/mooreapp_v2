import activitiesHeaders from '~/constants/dataHeaders/activitiesHeaders'
import clientsHeaders from '~/constants/dataHeaders/clientsHeaders'
import collaboratorsHeaders from '~/constants/dataHeaders/collaboratorsHeaders'
import projectsHeaders from '~/constants/dataHeaders/projectsHeaders'

export default function getHeaders(
  collection: 'clients' | 'projects' | 'collaborators' | 'activities'
) {
  let headers = []

  switch (collection) {
    case 'clients':
      headers = clientsHeaders
      break
    case 'projects':
      headers = projectsHeaders
      break
    case 'collaborators':
      headers = collaboratorsHeaders
      break
    case 'activities':
      headers = activitiesHeaders
      break
    default:
      headers = clientsHeaders
      break
  }

  return headers
}
