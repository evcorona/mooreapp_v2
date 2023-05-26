import ClientForm, { ClientFormTypes } from '~/components/Forms/ClientForm'
import { errorHandler, getById, updateClient } from '~/lib/api/clients'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { AxiosError } from 'axios'
import { CLIENTS_DEFAULT_VALUES } from '~/constants/defaultValues'
import Title from '~/components/Title'
import { toast } from 'react-toastify'

export default function EditClient() {
  const { id = '' } = useParams<string>()
  const navigate = useNavigate()

  const { data = CLIENTS_DEFAULT_VALUES, isLoading: isLoadingClient } =
    useQuery('clientDetails', () => getById(id))

  const { mutateAsync, isLoading: isSubmitting } = useMutation(updateClient, {
    onSuccess: () => {
      toast.success('Los datos del cliente han sido actualizados correctamente')
      navigate(-1)
    },
    onError: error => errorHandler(error as AxiosError),
  })

  function onSubmit(values: ClientFormTypes) {
    mutateAsync({ id, data: values })
  }

  return (
    <div className="container mx-auto space-y-4 px-4 pt-20 md:px-28">
      <Title title="Editar Cliente" />
      <ClientForm
        onSubmit={onSubmit}
        initialValues={data ?? CLIENTS_DEFAULT_VALUES}
        isLoading={isLoadingClient}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
