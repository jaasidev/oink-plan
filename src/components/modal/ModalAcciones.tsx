import { useSubmitForm } from '../../hooks/useSubmitForm'
import { Button } from '../buttons/button'
import { Modal } from './Modal'

export function ModalAcciones() {
  const { handleDelete } = useSubmitForm()
  return (
    <Modal id='my_modal_2'>
      <h3 className='font-bold text-lg'>Preguntas Frecuentes</h3>
      <div className='py-4'>
        <p>¿Estás seguro que desea eliminar los datos existentes?</p>
      </div>
      <div className='modal-action'>
        <form method='dialog' className='flex items-center gap-2'>
          <button className='btn btn-outline'>Cancelar</button>
          <Button className='btn-error' action={handleDelete}>
            Eliminar
          </Button>
        </form>
      </div>
    </Modal>
  )
}
