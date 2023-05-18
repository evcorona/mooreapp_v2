import * as z from 'zod'

import { errorHandler, login } from '../lib/api/login'

import { AxiosError } from 'axios'
import Button from '../components/Button'
import Input from '../components/Inputs/Input'
import { LoginData } from '../types/objects'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Introduce un email válido' })
    .nonempty({ message: 'Campo requerido' }),
  password: z.string().nonempty({ message: 'Campo requerido' }),
})

export default function Login(): JSX.Element {
  const { mutateAsync, isLoading } = useMutation(login, {
    onSuccess: loginData => {
      sessionStorage.setItem('moore-jwt', loginData.token)
      loginData.role === 'Administrador'
        ? window.location.assign('/administrator')
        : window.location.assign('/collaborator')
    },
    onError: error => errorHandler(error as AxiosError),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  function onSubmit(values: LoginData) {
    mutateAsync(values)
  }

  return (
    <main
      className={clsx(
        'bg-login bg-cover bg-center',
        'h-screen w-screen',
        'flex justify-center items-center',
        'p-4 md:p-6'
      )}
    >
      <form
        className={clsx(
          'px-4 py-8 md:p-8 rounded',
          'flex flex-col gap-2',
          'bg-white/80'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={clsx(
            'bg-logo bg-contain bg-no-repeat bg-center',
            'w-full h-36 mb-2',
            'rounded'
          )}
        />
        <Input
          label="Correo electrónico"
          type="email"
          name="email"
          register={register}
          placeholder="juan@msdat.com"
          error={errors?.email?.message}
          required
        />
        <Input
          label="Contraseña"
          type="password"
          name="password"
          register={register}
          placeholder="********************"
          error={errors?.password?.message}
          required
        />
        <Button
          isDisabled={!isValid || isLoading}
          isSubmit
          priority="primary"
          className={clsx('mt-2   ', {
            'border-2 border-brand-gray': !isValid,
            'border-0 bg-brand/50 hover:bg-brand/60': isValid,
          })}
        >
          {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
        </Button>
      </form>
    </main>
  )
}
