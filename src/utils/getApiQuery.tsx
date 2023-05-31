import { deleteById as deleteClient } from '~/lib/api/clients'
import { deleteById as deleteCollaborator } from '~/lib/api/collaborators'
import { deleteById as deleteProject } from '~/lib/api/projects'
import { getAll as getAllActivities } from '~/lib/api/activities'
import { getAll as getAllClients } from '~/lib/api/clients'
import { getAll as getAllCollaborators } from '~/lib/api/collaborators'
import { getAll as getAllProjects } from '~/lib/api/projects'
import { getById as getClientById } from '~/lib/api/clients'
import { getById as getCollaboratorById } from '~/lib/api/collaborators'
import { getById as getProjectById } from '~/lib/api/projects'

export default function getApiQuery(
  queryType: 'getAll' | 'getById' | 'deleteById',
  collection: 'clients' | 'projects' | 'collaborators' | 'activities'
) {
  let apiQuery = undefined

  switch (collection) {
    case 'clients':
      apiQuery =
        queryType === 'getAll'
          ? getAllClients
          : queryType === 'getById'
          ? getClientById
          : deleteClient
      break
    case 'projects':
      apiQuery =
        queryType === 'getAll'
          ? getAllProjects
          : queryType === 'getById'
          ? getProjectById
          : deleteProject
      break
    case 'collaborators':
      apiQuery =
        queryType === 'getAll'
          ? getAllCollaborators
          : queryType === 'getById'
          ? getCollaboratorById
          : deleteCollaborator
      break
    default:
      apiQuery = getAllActivities
      break
  }

  return apiQuery
}
