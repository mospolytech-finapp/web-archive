import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
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
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [regError, setRegError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await UserDataService.register({
        email: data.email,
        password: data.password,
        last_name: data.last_name,
        first_name: data.first_name,
        middle_name: data.middle_name != null ? data.middle_name : '',
        date_of_birth: `${new Date(data.date_of_birth).getFullYear()}-${
          new Date(data.date_of_birth).getMonth() + 1
        }-${new Date(data.date_of_birth).getDate()}`
      })

      localStorage.setItem('token', response.data.token)
      setRegError('')
      navigate('/auth')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setRegError(err.response?.data.errors[0].detail)
        console.error(regError)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <div className="pt-10">
      <form className="mx-2.5 rounded-3xl bg-[#E5E5E5CC]/80 py-16 px-8 font-sans font-normal tracking-normal sm:mx-auto md:max-w-lg md:px-14 md:py-8 xl:px-11 xl:py-14">
        <fieldset className="mb-5 grid lg:mb-4">
          <legend className="from-light-green-text to-light-blue-text mb-4 bg-gradient-to-r bg-clip-text text-center text-xl font-medium text-transparent sm:text-2xl md:mb-10">
            Создать учетную запись
          </legend>
          <Input
            error={errors.last_name ? true : false}
            id="last_name"
            label="Фамилия*"
            name="last_name"
            placeholder=""
            register={register}
            type="text"
            onClick={() => {
              null
            }}
          />
          <Input
            error={errors.first_name ? true : false}
            id="first_name"
            label="Имя*"
            name="first_name"
            placeholder=""
            register={register}
            type="text"
            onClick={() => {
              null
            }}
          />
          <Input
            error={errors.middle_name ? true : false}
            id="middle_name"
            label="Отчество"
            name="middle_name"
            placeholder=""
            register={register}
            type="text"
            onClick={() => {
              null
            }}
          />
          <Input
            error={errors.password ? true : false}
            id="password"
            label="Пароль*"
            name="password"
            placeholder=""
            register={register}
            type="password"
            onClick={() => {
              null
            }}
          />
          <Input
            error={errors.email ? true : false}
            id="email"
            label="E-mail*"
            name="email"
            placeholder=""
            register={register}
            type="email"
            onClick={() => {
              null
            }}
          />
          <Input
            error={errors.date_of_birth ? true : false}
            id="date_of_birth"
            label="Дата рождения*"
            name="date_of_birth"
            placeholder=""
            register={register}
            type="date"
            onClick={() => {
              null
            }}
          />
          {regError && <span className="text-xs text-[#FF6F6F] md:text-base">{regError}</span>}
          <span className="mb-4 text-sm text-[#7C7C7C] md:text-base">
            *Обязательное поле для ввода
          </span>
          <Button
            margin=""
            w=""
            background="from-light-green to-light-blue bg-gradient-to-r"
            disable={!isValid}
            textColor="text-white"
            // TODO: исправить отправку запросов, onSubmit
            onClick={() => onSubmit(watch())}
          >
            {'Продолжить'}
          </Button>
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
    </div>
  )
}

export default RegisterForm
