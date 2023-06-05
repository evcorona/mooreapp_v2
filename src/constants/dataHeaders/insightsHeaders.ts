export const generalInsightsHeaders = [
  {
    header: 'Clientes',
    accessor: 'clientsInsights',
  },
  {
    header: 'Proyectos',
    accessor: 'projectsInsights',
  },
  {
    header: 'Colaboradores',
    accessor: 'collaboratorsInsights',
  },
  {
    header: 'Actividades',
    accessor: 'activitiesInsights',
  },
]

export const topFiveInsightsHeaders = [
  {
    header: '⭐️ Clientes',
    accessor: 'topClients',
    subAccessor: 'clientName',
  },
  {
    header: '⭐️ Proyectos',
    accessor: 'topProjects',
    subAccessor: 'codeProject',
  },
  {
    header: '⭐️ Colaboradores',
    accessor: 'topCollaborators',
    subAccessor: ['name', 'lastName'],
  },
]
