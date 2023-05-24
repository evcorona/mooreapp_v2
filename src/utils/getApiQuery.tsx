import { getAll as getAllActivities } from '~/lib/api/activities'
import { getAll as getAllClients } from '~/lib/api/clients'
import { getAll as getAllCollaborators } from '~/lib/api/collaborators'
import { getAll as getAllProjects } from '~/lib/api/projects'
import { getById as getClientById } from '~/lib/api/clients'
import { getById as getCollaboratorById } from '~/lib/api/collaborators'
import { getById as getProjectById } from '~/lib/api/projects'

export default function getApiQuery(
  queryType: 'getAll' | 'getById',
  collection: 'clients' | 'projects' | 'collaborators' | 'activities'
) {
  let apiQuery = undefined

  switch (collection) {
    case 'clients':
      apiQuery = queryType === 'getAll' ? getAllClients : getClientById
      break
    case 'projects':
      apiQuery = queryType === 'getAll' ? getAllProjects : getProjectById
      break
    case 'collaborators':
      apiQuery =
        queryType === 'getAll' ? getAllCollaborators : getCollaboratorById
      break
    default:
      apiQuery = getAllActivities
      break
  }

  return apiQuery
}
