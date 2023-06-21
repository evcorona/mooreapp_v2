export const ROLES = {
  admin: 'Administrador',
  user: 'Colaborador',
}

export const NAVIGATION_ITEMS = {
  user: [
    { title: 'Inicio', to: '/collaborator' },
    { title: 'Actividades', to: '/activities' },
  ],
  admin: [
    { title: 'Inicio', to: '/' },
    { title: 'Clientes', to: '/clients' },
    { title: 'Proyectos', to: '/projects' },
    { title: 'Colaboradores', to: '/collaborators' },
    { title: 'Actividades', to: '/activities' },
  ],
}
