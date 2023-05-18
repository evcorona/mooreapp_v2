export default {
  roles: {
    admin: 'Administrador',
    user: 'Colaborador',
  },
  navigation: {
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
  },
}
