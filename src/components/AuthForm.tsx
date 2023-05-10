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
  username: z.string().email({ message: 'Неверный логин или пароль' }),
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loginError, setLoginError] = useState('')

  const onSubmit = (data: FieldValues) => {
    UserDataService.login({
      username: data.username,
      password: data.password
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        setLoginError('')

        return response
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setLoginError(err.response?.data.errors[0].detail.toString())
          console.error(loginError)
        } else {
          console.error(err)
        }
      })
  }

  return (
    <form
      className="rounded-3xl bg-[#E5E5E5CC]/80 px-2.5 py-8 font-sans font-normal tracking-normal sm:px-6 md:max-w-lg md:px-12 md:py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="mb-5 grid w-72 md:w-96 lg:mb-4">
        <legend className="from-light-green-text to-light-blue-text mb-10 bg-gradient-to-r bg-clip-text text-center text-2xl font-medium text-transparent md:text-2xl">
          Вход
        </legend>
        <Input
          error={errors.username ? true : false}
          id="username"
          label="Адрес электронной почты"
          name="username"
          placeholder=""
          register={register}
          type="email"
        />
        <Input
          error={errors.password ? true : false}
          id="password"
          label="Пароль"
          name="password"
          placeholder=""
          register={register}
          type="password"
        />
        <div className="mb-6 flex min-w-full justify-between">
          {(errors.username || errors.password || loginError) && (
            <p className="text-xs text-[#FF6F6F] md:mr-5 md:text-base">
              {errors.username?.message?.toString() ||
                errors.password?.message?.toString() ||
                loginError}
            </p>
          )}
          <a
            className="focus:border-blue-focus text-xs text-[#7C7C7C] focus:border-2 focus:outline-0 md:text-base"
            href="#"
          >
            Забыли пароль?
          </a>
        </div>
        <Input
          error={errors.password ? true : false}
          id="remember_password"
          label="Запомнить аккаунт"
          name="remember_password"
          placeholder=""
          register={register}
          type="checkbox"
        />
        <Button
          background="from-light-green to-light-blue bg-gradient-to-r"
          disable={!isValid}
          textColor="text-white"
          onClick={() => null}
        >
          {'Войти'}
        </Button>
      </fieldset>
      <div className="flex items-center justify-between">
        <Link className="mr-5 text-xs font-light text-[#07836C] md:text-base" to="/register">
          Нужна учетная запись?
        </Link>
        <button
          className="text-xs font-light text-[#3076B8] md:text-base"
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            setIsModalOpen(true)
          }}
        >
          Связаться с нами
        </button>
      </div>
      <ModalContact open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </form>
  )
}

export default AuthForm
