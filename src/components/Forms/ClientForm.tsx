import Button from '~/components/Buttons/Button'
import { ClientsData } from '~/types/objects'
import Input from '~/components/Inputs/Input'
import TextArea from '~/components/Inputs/TextArea'
import clsx from 'clsx'
import schema from '~/schemas/clientSchema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  initialValues: ClientsData
  isSubmitting: boolean
  isClearable?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  onSubmit: (values: ClientsData) => void
}

export default function ClientForm(props: Props) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
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
        'border bg-white shadow-md'
      )}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input
        label="Cliente"
        type="text"
        name="clientName"
        register={register}
        placeholder="Nombre del cliente..."
        error={errors?.clientName?.message}
        isLoading={props.isLoading}
        required
      />
      <Input
        label="Código del cliente"
        type="text"
        name="codeClient"
        register={register}
        placeholder="XXX"
        error={errors?.codeClient?.message}
        isLoading={props.isLoading}
        required
      />
      <Input
        label="Grupo"
        type="text"
        name="group"
        register={register}
        placeholder="Nombre del grupo..."
        error={errors?.group?.message}
        isLoading={props.isLoading}
        required
      />
      <Input
        label="RFC"
        type="text"
        name="RFC"
        register={register}
        placeholder="XXXXXXXXXX"
        error={errors?.RFC?.message}
        isLoading={props.isLoading}
        required
      />
      <TextArea
        label="Domicilio"
        type="text"
        name="address"
        register={register}
        placeholder="Domicilio fiscal del cliente..."
        error={errors?.address?.message}
        isLoading={props.isLoading}
        required
      />

      <div className="join">
        {props.isClearable && (
          <>
            <Button className="join-item w-1/2" onClick={() => reset()}>
              Limpiar
            </Button>
          </>
        )}
        {!props.isClearable && (
          <Button className="join-item w-1/2" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        )}
        <Button
          isDisabled={!isValid}
          isLoading={props.isLoading}
          isSubmit
          primary
          className={clsx('join-item w-1/2', {
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
