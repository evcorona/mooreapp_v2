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
  client: { value: '', _id: '' },
  manager: { value: '', _id: '' },
}

export const COLLABORATORS_DEFAULT_VALUES = {
  name: '',
  lastName: '',
  employeeNumber: '',
  email: '',
  rol: '',
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
