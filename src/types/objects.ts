export type LoginData = {
  email: string
  password: string
}

export type NavBarProps = {
  items: {
    title: string
    to: string
  }[]
}

export type ClientsData = {
  _id: string
  clientName: string
  group: string
  codeClient: string
  RFC: string
  address: string
}

export type ProjectsData = {
  _id: string
  codeProject: string
  clientName?: string
  managerName?: string
  durationType?: string[]
  projectType: string
  clientID: {
    _id: string
    clientName: string
  }
  managerID?: {
    _id: string
    name: string
    lastName: string
  }
}

export type CollaboratorsData = {
  _id: string
  email: string
  rol: string | null
  name: string
  lastName: string
  positionJob: string
  fee: number
  partner: string
  area: string
  employeeNumber: string | number
  employmentDate: Date
}

export type ActivitiesData = {
  _id: string
  activityType: string
  timeAmmount: number
  activityDate: Date | string
  fee?: number
  client?: string
  concept?: string
  createdBy?: string
  userID: {
    _id: string
    name: string
    lastName: string
  }
  clientID: {
    _id: string
    clientName: string
  }
  projectID: {
    _id: string
    codeProject: string
  }
}

export type GeneralInsights = {
  clientsInsights: number
  projectsInsights: number
  collaboratorsInsights: number
  activitiesInsights: number
}

export type TopFiveClientsInsights = {
  clientName: string
  totalCost: number
  totalTime: number
}

export type TopFiveProjectsInsights = {
  codeProject: string
  totalCost: number
  totalTime: number
}

export type TopFiveCollaboratorsInsights = {
  name: string
  lastName: string
  totalCost: number
  totalTime: number
}

export type TopFiveInsights = {
  topClients: TopFiveClientsInsights[]
  topProjects: TopFiveProjectsInsights[]
  topCollaborators: TopFiveCollaboratorsInsights[]
}

export type DateRangeData = {
  startDate: Date
  endDate: Date
}

export type CollectionsDataType =
  | ClientsData
  | ProjectsData
  | CollaboratorsData
  | ActivitiesData

export type CollectionTopFiveInsights =
  | TopFiveClientsInsights
  | TopFiveCollaboratorsInsights
  | TopFiveProjectsInsights
