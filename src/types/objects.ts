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
  rol: string
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
  client: string
  concept: string
  activityDate: Date
  createdBy: string
  fee: number
}

export type CollectionsDataType =
  | ClientsData
  | ProjectsData
  | CollaboratorsData
  | ActivitiesData
