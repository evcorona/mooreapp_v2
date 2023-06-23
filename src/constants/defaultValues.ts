export const CLIENTS_DEFAULT_VALUES = {
  _id: '',
  clientName: '',
  codeClient: '',
  group: '',
  RFC: '',
  address: '',
}

export const PROJECTS_DEFAULT_VALUES = {
  _id: '',
  codeProject: '',
  clientName: '',
  managerName: '',
  projectType: '',
  clientID: {
    _id: '',
    clientName: '',
  },
  managerID: {
    _id: '',
    name: '',
    lastName: '',
  },
}

export const PROJECTS_FORM_DEFAULT_VALUES = {
  codeProject: '',
  projectType: '',
  client: { value: '', _id: '', codeClient: '' },
  manager: { value: '', _id: '' },
}

export const COLLABORATORS_DEFAULT_VALUES = {
  name: '',
  lastName: '',
  employeeNumber: '',
  email: '',
  rol: null,
  positionJob: '',
  area: '',
  fee: 0,
  partner: '',
  employmentDate: new Date(),
  _id: '',
}

export const ACTIVITIES_DEFAULT_VALUES = {
  _id: '',
  createdBy: '',
  activityDate: '',
  activityType: '',
  client: '',
  concept: '',
  timeAmmount: '',
  fee: '',
}

export const GENERAL_INSIGHTS_DEFAULT_VALUES = {
  clientsInsights: 0,
  projectsInsights: 0,
  collaboratorsInsights: 0,
  activitiesInsights: 0,
}

export const TOP_TEN_INSIGHTS_DEFAULT_VALUES = {
  topClients: [
    {
      clientName: '',
      totalCost: 0,
      totalTime: 0,
    },
  ],
  topProjects: [
    {
      codeProject: '',
      totalCost: 0,
      totalTime: 0,
    },
  ],
  topCollaborators: [
    {
      name: '',
      lastName: '',
      totalCost: 0,
      totalTime: 0,
    },
  ],
}
