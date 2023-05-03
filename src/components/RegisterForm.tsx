import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import UserDataService from '../services/user-service'

import Input from './ui/Input'
import Button from './ui/Button'
import ModalContact from './ui/modals/ModalContact'

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
        <Input
          error={errors.surname ? true : false}
          id="surname"
          label="Фамилия*"
          name="surname"
          placeholder=""
          register={register}
          type="text"
        />
        <Input
          error={errors.name ? true : false}
          id="name"
          label="Имя*"
          name="name"
          placeholder=""
          register={register}
          type="text"
        />
        <Input
          id="patronymic"
          label="Отчество"
          name="patronymic"
          placeholder=""
          register={register}
          type="text"
        />
        <Input
          error={errors.password ? true : false}
          id="password"
          label="Пароль*"
          name="password"
          placeholder=""
          register={register}
          type="password"
        />
        <Input
          error={errors.email ? true : false}
          id="email"
          label="E-mail*"
          name="email"
          placeholder=""
          register={register}
          type="email"
        />
        <Input
          error={errors.date ? true : false}
          id="date"
          label="Дата рождения*"
          name="date"
          placeholder=""
          register={register}
          type="date"
        />
        <label className="mb-3 flex flex-col items-start justify-start sm:mb-2" htmlFor="gender">
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Пол</span>
          <select
            className="text-light-gray max-h-12 w-full appearance-none rounded-full bg-[#ECECEC] py-3 px-6 font-normal sm:text-base md:text-xl"
            {...register('gender')}
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </label>
        <div className="mb-4 flex flex-wrap justify-between">
          {!isValid && (
            <p className="text-sm text-[#FF6F6F] md:text-base">
              {errors.surname?.message ||
                errors.name?.message ||
                errors.password?.message ||
                errors.email?.message ||
                errors.date?.message}
            </p>
          )}
          <span className="text-sm text-[#7C7C7C] md:text-base">*Обязательное поле для ввода</span>
        </div>
        <Button
          background="from-light-green to-light-blue bg-gradient-to-r"
          disable={!isValid}
          textColor="text-white"
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
  )
}

export default RegisterForm
