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
  isActive: boolean
}

export type ProjectsData = {
  _id: string
  codeProject: string
  clientName: string
  projectType: string
  isActive: boolean
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
  isActive: boolean
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
  isActive?: boolean
}

export type CollectionsDataType =
  | ClientsData
  | ProjectsData
  | CollaboratorsData
  | ActivitiesData
