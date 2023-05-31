import Button from '~/components/Button'
import { CollaboratorsData } from '~/types/objects'
import Input from '~/components/Inputs/Input'
import ListBox from '~/components/Inputs/ListBox'
import clsx from 'clsx'
import schema from '~/schemas/collaboratorSchema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  initialValues: CollaboratorsData
  isSubmitting: boolean
  isClearable?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  onSubmit: (values: CollaboratorsData) => void
}

export default function CollaboratorForm(props: Props) {
  const navigate = useNavigate()

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: props.initialValues,
    values: props.initialValues,
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  useEffect(() => reset(), [props.isSuccess])

  return (
    <form
      className={clsx(
        'rounded px-4 py-8 md:p-8',
        'flex flex-col gap-2',
        'bg-white shadow-md'
      )}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <div className="grid-cols-2 space-y-4 md:gap-4 md:space-y-0 lg:grid">
        <Input
          label="Nombre"
          type="text"
          name="name"
          register={register}
          placeholder="Nombre del colaborador..."
          error={errors?.name?.message}
          required
        />
        <Input
          label="Apellidos"
          type="text"
          name="lastName"
          register={register}
          placeholder="Apellidos del colaborador..."
          error={errors?.lastName?.message}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          register={register}
          placeholder="Email del empleado..."
          error={errors?.email?.message}
          required
        />
        <ListBox
          name="rol"
          label="Rol"
          placeholder="Rol del empleado en la plataforma..."
          options={['Administrador', 'Colaborador']}
          control={control}
          defaultValue={props.initialValues.rol}
          error={errors?.rol?.message}
          required
        />
        <Input
          label="Número de empleado"
          type="text"
          name="employeeNumber"
          register={register}
          placeholder="######"
          error={errors?.employeeNumber?.message}
          required
        />
        <Input
          label="Puesto laboral"
          type="text"
          name="positionJob"
          register={register}
          placeholder="Puesto del empleado..."
          error={errors?.positionJob?.message}
          required
        />
        <Input
          label="Área"
          type="text"
          name="area"
          register={register}
          placeholder="Área del empleado..."
          error={errors?.area?.message}
          required
        />
        <Input
          label="Socio"
          type="text"
          name="partner"
          register={register}
          placeholder="Socio correspondiente al empleado..."
          error={errors?.partner?.message}
          required
        />
        <Input
          label="Cuota por hora"
          type="number"
          prefix="currency"
          name="fee"
          register={register}
          placeholder="0000"
          error={errors?.fee?.message}
          required
        />
        <Input
          label="Fecha de inicio laboral"
          type="date"
          name="employmentDate"
          register={register}
          placeholder="Fecha de inicio laboral del empleado..."
          error={errors?.employmentDate?.message}
          required
        />
      </div>

      <div className="btn-group">
        {props.isClearable && (
          <>
            <Button outline className="w-1/4" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button outline className="w-1/4" onClick={() => reset()}>
              Limpiar
            </Button>
          </>
        )}
        {!props.isClearable && (
          <Button outline className="w-1/2" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        )}
        <Button
          isDisabled={!isValid}
          isLoading={props.isLoading}
          isSubmit
          primary
          className={clsx('w-1/2', {
            'border-brand-gray border-2': !isValid,
            'bg-brand/50 hover:bg-brand/60 border-0': isValid,
          })}
        >
          {props.isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
