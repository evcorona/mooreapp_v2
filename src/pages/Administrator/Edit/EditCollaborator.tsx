import {
  errorHandler,
  getById,
  updateCollaborator,
} from '~/lib/api/collaborators'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { AxiosError } from 'axios'
import { COLLABORATORS_DEFAULT_VALUES } from '~/constants/defaultValues'
import CollaboratorForm from '~/components/Forms/CollaboratorForm'
import { CollaboratorsData } from '~/types/objects'
import Title from '~/components/Title'
import { toast } from 'react-toastify'

export default function EditCollaborator() {
  const { id = '' } = useParams<string>()
  const navigate = useNavigate()

  const {
    data = COLLABORATORS_DEFAULT_VALUES,
    isLoading: isLoadingCollaborator,
  } = useQuery('collaboratorDetails', () => getById(id))

  const { mutateAsync, isLoading: isSubmitting } = useMutation(
    updateCollaborator,
    {
      onSuccess: () => {
        toast.success(
          'Los datos del colaborador han sido actualizados correctamente'
        )
        navigate(-1)
      },
      onError: error => errorHandler(error as AxiosError),
    }
  )

  function onSubmit(values: CollaboratorsData) {
    mutateAsync({ id, data: values })
  }

  return (
    <div className="container mx-auto space-y-4 px-4 pb-4 pt-20 md:px-28">
      <Title title="Editar Colaborador" />
      <CollaboratorForm
        onSubmit={onSubmit}
        initialValues={data}
        isLoading={isLoadingCollaborator}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
