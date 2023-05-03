import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import ModalInputsBtns from './ui/ModalInputsBtns'
import ModalBtns from './ui/ModalBtns'

const schema = z.object({
  email: z.string().email({ message: 'Неверный логин или пароль' }),
  password: z.string().nonempty({ message: 'Неверный логин или пароль' }),
  remember_password: z.boolean()
})

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })
  const [isModalInputOpen, setIsModalInputOpen] = useState(false)
  const [isModalBtnOpen, setIsModalBtnOpen] = useState(false)
  const [modalType, setModalType] = useState('inputs')

  const onSubmit = (data: object) => {
    console.log(data)
  }

  return (
    <form
      className="mx-2.5 rounded-3xl bg-[#E5E5E5CC]/80 px-2.5 py-8 font-sans font-normal tracking-normal sm:px-6 md:max-w-md md:px-12 md:py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-5 flex flex-col items-center justify-between">
        <button
          className="text-xs font-light text-[#3076B8] md:text-base"
          onClick={() => {
            setIsModalInputOpen(true)
          }}
        >
          кнопки и инпуты
        </button>
        <button
          className="text-xs font-light text-[#3076B8] md:text-base"
          onClick={() => {
            setIsModalBtnOpen(true)
          }}
        >
          кнопки
        </button>
      </div>
      <ModalInputsBtns
        buttons={[
          {
            background: 'from-light-red to-light-blue bg-gradient-to-r',
            textColor: 'text-white',
            children: 'Отправить',
            onClick: () => console.log('Submitted')
          },
          {
            background: 'from-light-green to-light-blue bg-gradient-to-r',
            textColor: 'text-white',
            children: 'Отправить',
            onClick: () => console.log('Submitted')
          }
        ]}
        inputs={[
          { id: '', label: 'Имя', placeholder: 'имяяя', name: 'name', type: 'text' },
          { id: '', label: 'Имя', placeholder: 'имяяя', name: 'name', type: 'password' },
          { id: '', label: 'Имя', placeholder: 'имяяя', name: 'name', type: 'checkbox' }
        ]}
        open={isModalInputOpen}
        title="Заголовок модального окна"
        onClose={() => setIsModalInputOpen(false)}
      />

      <ModalBtns
        buttons={[
          {
            background: 'bg-white',
            textColor: 'black',
            children: 'Отправить',
            onClick: () => console.log('Submitted')
          },
          {
            background: 'from-light-red to-light-blue bg-gradient-to-r',
            textColor: 'text-white',
            children: 'Отправить',
            onClick: () => console.log('Submitted')
          }
        ]}
        direction="flex-col"
        open={isModalBtnOpen}
        title="Модальное окно с кнопками"
        onClose={() => setIsModalBtnOpen(false)}
      />
    </form>
  )
}

export default AuthForm
