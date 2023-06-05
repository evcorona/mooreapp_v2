import { headers, routes } from './routes'

import { AxiosError } from 'axios'
import { ProjectsData } from '~/types/objects'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import { toast } from 'react-toastify'

function formatData(projects: any[]) {
  return projects.map(project => {
    return {
      ...project,
      managerName:
        project.managerID &&
        `${project.managerID.name} ${project.managerID.lastName}`,
      clientName: project.clientID?.clientName ?? project.clientName,
    }
  })
}

export async function getAll(): Promise<ProjectsData[]> {
  const response = await api
    .get(routes.projects, headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.projects', [])
  const formattedData = formatData(data)

  return formattedData
}

export async function getById(id: string): Promise<ProjectsData> {
  const response = await api
    .get(routes.projects + id, headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.project', [])
  const [formattedData] = formatData([data])

  return formattedData
}

export async function createProject(data: ProjectsData): Promise<ProjectsData> {
  const response = await api.post(routes.projects, data, headers)

  return _.get(response, 'data.data.project')
}

export function errorHandler(error: AxiosError): void {
  if (!error.response) {
    toast.error(errors.api.network.message)
    return
  }

  switch (error.response?.status) {
    case errors.api.duplicated.status:
      toast.error(errors.api.duplicated.messageProject)
      break

    default:
      toast.error(errors.api.unknown.message)
      break
  }
  //TODO: handle unauthorized error

  return
}
