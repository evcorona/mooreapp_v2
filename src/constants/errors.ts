export const errors = {
  api: {
    invalidData: {
      status: 401,
      message: 'Email o contraseña incorrectos',
    },
    network: {
      message:
        'Error de red, intenta de nuevo. Si persiste favor de reportarlo',
    },
    revoked: {
      status: 403,
      message: 'Acceso denegado',
    },
    unknown: {
      message:
        'Error desconocido, intenta de nuevo. Si persiste favor de reportarlo',
    },
  },
}
