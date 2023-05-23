export const ROLES = {
  admin: 'Administrador',
  user: 'Colaborador',
}

export const NAVIGATION_ITEMS = {
  user: [
    { title: 'Resumen', to: '/collaborator' },
    { title: 'Actividades', to: '/activities' },
  ],
  admin: [
    { title: 'Clientes', to: '/clients' },
    { title: 'Proyectos', to: '/projects' },
    { title: 'Colaboradores', to: '/collaborators' },
    { title: 'Actividades', to: '/activities' },
  ],
}

export const DB_SCHEMA = {
  admin: {
    clients: {
      clientName: 'Cliente',
      codeClient: 'Código',
      group: 'Grupo',
      RFC: 'RFC',
      address: 'Domicilio',
    },
    projects: {
      codeProject: 'Código',
      clientName: 'Cliente',
      projectType: 'Tipo',
      managerName: 'Gerente',
    },
    collaborators: {
      name: 'Nombre',
      lastName: 'Apellidos',
      employeeNumber: 'Número de empleado',
      email: 'Email',
      rol: 'Rol',
      positionJob: 'Posición',
      area: 'Área',
      // fee: 'Cuota Hora',
      // partner: 'Socio',
      employmentDate: 'Fecha de inicio',
    },
    activities: {
      createdBy: 'Colaborador',
      activityDate: 'Fecha',
      activityType: 'Tipo de actividad',
      client: 'Cliente',
      concept: 'Concepto',
      timeAmmount: 'Tiempo',
      fee: 'Costo',
    },
  },
}
