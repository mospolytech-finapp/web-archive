import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import UserDataService from '../services/user-service'

import Input from './ui/Input'
import Button from './ui/Button'
import ModalContact from './ui/ModalContact'

const schema = z.object({
  last_name: z.string().nonempty({ message: 'Заполните обязательные поля' }),
  first_name: z.string().nonempty({ message: 'Заполните обязательные поля' }),
  middle_name: z.string().optional(),
  password: z.string().nonempty({ message: 'Заполните обязательные поля' }),
  email: z.string().email({ message: 'Заполните обязательные поля' }),
  date_of_birth: z.coerce.date()
})

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [regError, setRegError] = useState('')

  const onSubmit = (data: FieldValues) => {
    UserDataService.register({
      email: data.email,
      password: data.password,
      last_name: data.last_name,
      first_name: data.first_name,
      middle_name: data.middle_name != null ? data.middle_name : '',
      date_of_birth: `${data.date_of_birth.getFullYear()}-${
        data.date_of_birth.getMonth() + 1
      }-${data.date_of_birth.getDate()}`
    })
      .then((response) => {
        console.log(response.data)
        setRegError('')

        return response
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setRegError(err.response?.data[Object.keys(err.response?.data)[0]][0].toString())
          console.log(regError)
        } else {
          console.log(err)
        }
      })
  }

  return (
    <form
      className="mx-2.5 rounded-3xl bg-[#E5E5E5CC]/80 py-16 px-8 font-sans font-normal tracking-normal sm:mx-0 md:max-w-lg md:px-14 md:py-8 xl:px-11 xl:py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="mb-5 grid lg:mb-4">
        <legend className="from-light-green-text to-light-blue-text mb-4 bg-gradient-to-r bg-clip-text text-center text-xl font-medium text-transparent sm:text-2xl md:mb-10">
          Создать учетную запись
        </legend>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="last_name"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Фамилия*</span>
          <Input
            error={errors.last_name ? true : false}
            id="last_name"
            name="last_name"
            register={register}
            type="text"
          />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="first_name"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Имя*</span>
          <Input
            error={errors.first_name ? true : false}
            id="first_name"
            name="first_name"
            register={register}
            type="text"
          />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="middle_name"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Отчество</span>
          <Input id="middle_name" name="middle_name" register={register} type="text" />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="password"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Пароль*</span>
          <Input
            error={errors.password ? true : false}
            id="password"
            name="password"
            register={register}
            type="password"
          />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="email"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">E-mail*</span>
          <Input
            error={errors.email ? true : false}
            id="email"
            name="email"
            register={register}
            type="email"
          />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="date_of_birth"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">
            Дата рождения*
          </span>
          <Input
            error={errors.date_of_birth ? true : false}
            id="date_of_birth"
            name="date_of_birth"
            register={register}
            type="date"
          />
        </label>
        <span className="mb-4 text-sm text-[#7C7C7C] md:text-base">
          *Обязательное поле для ввода
        </span>
        <Button disable={!isValid}>Продолжить</Button>
      </fieldset>
      <div className="flex flex-wrap items-center justify-between">
        <Link className="mr-5 text-sm font-light text-[#07836C] md:text-base" to="/auth">
          Уже зарегистрированы?
        </Link>
        <button
          className="text-sm font-light text-[#3076B8] md:text-base"
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            setIsModalOpen(true)
          }}
        >
          Связаться с нами
        </button>
      </div>
      <ModalContact
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
    </form>
  )
}

export default RegisterForm
