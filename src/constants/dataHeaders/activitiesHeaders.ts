export default [
  {
    header: 'Colaborador',
    accessor: 'createdBy',
    className: 'whitespace-nowrap',
  },
  {
    header: 'Fecha',
    accessor: 'activityDate',
    className: 'whitespace-nowrap',
  },
  {
    header: 'Actividad',
    accessor: 'activityType',
    className: 'whitespace-nowrap',
  },
  {
    header: 'Cliente',
    accessor: 'client',
    className: 'whitespace-normal',
  },
  {
    header: 'Proyecto',
    accessor: 'concept',
    className: 'whitespace-nowrap',
  },
  {
    header: 'Tiempo',
    accessor: 'timeAmmountFormatted',
    className: 'whitespace-nowrap',
  },
  {
    header: 'Costo',
    accessor: 'feeFormatted',
    className: 'whitespace-nowrap text-start',
    hideForCollaborator: true,
  },
]
