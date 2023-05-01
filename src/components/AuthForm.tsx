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
    console.log(process.env)
    console.log(import.meta.env)
    UserDataService.login({
      username: data.username,
      password: data.password
    })
      .then((response) => {
        console.log(response.data)
        setLoginError('')

        return response
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setLoginError(err.response?.data.errors[0].detail.toString())
        } else {
          console.log(err)
        }
      })
  }

  return (
    <form
      className="mx-2.5 rounded-3xl bg-[#E5E5E5CC]/80 px-2.5 py-8 font-sans font-normal tracking-normal sm:px-6 md:max-w-lg md:px-12 md:py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="mb-5 grid w-72 md:w-96 lg:mb-4">
        <legend className="from-light-green-text to-light-blue-text mb-10 bg-gradient-to-r bg-clip-text text-center text-2xl font-medium text-transparent md:text-2xl">
          Вход
        </legend>
        <label className="mb-3.5 flex flex-col items-start justify-start" htmlFor="username">
          <span className="mb-2.5 text-xs uppercase text-[#2B2B2B] md:text-base">
            АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ
          </span>
          <Input
            error={errors.username ? true : false}
            id="username"
            name="username"
            register={register}
            type="email"
          />
        </label>
        <label className="mb-2 flex flex-col items-start justify-start" htmlFor="password">
          <span className="mb-2.5 text-xs uppercase text-[#2B2B2B] md:text-base">ПАРОЛЬ</span>
          <Input
            error={errors.password ? true : false}
            id="password"
            name="password"
            register={register}
            type="password"
          />
        </label>
        <div className="mb-6 flex min-w-full justify-between">
          {(errors.username || errors.password || loginError) && (
            <p className="text-xs text-[#FF6F6F] md:mr-5 md:text-base">
              {errors.username?.message?.toString() ||
                errors.password?.message?.toString() ||
                loginError}
            </p>
          )}
          <a className="text-xs text-[#7C7C7C] md:text-base" href="#">
            Забыли пароль?
          </a>
        </div>
        <label className="mb-8 flex items-center" htmlFor="remember_password">
          <Input
            id="remember_password"
            name="remember_password"
            register={register}
            type="checkbox"
          />
          <span className="ml-3 text-xs font-light text-[#2B2B2B] md:text-base">
            Запомнить аккаунт
          </span>
        </label>
        <Button disable={!isValid}>Войти</Button>
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
