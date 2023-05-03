import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import Input from './ui/Input'
import Button from './ui/Button'
import ModalContact from './ui/ModalContact'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSubmit = (data: object) => {
    console.log(data)
  }

  return (
    <form
      className="mx-2.5 rounded-3xl bg-[#E5E5E5CC]/80 px-2.5 py-8 font-sans font-normal tracking-normal sm:px-6 md:max-w-md md:px-12 md:py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="grid">
        <legend className="from-light-green-text to-light-blue-text mb-10 bg-gradient-to-r bg-clip-text text-center text-2xl font-medium text-transparent md:text-2xl">
          Вход
        </legend>
        <Input
          error={errors.email ? true : false}
          id="email"
          label="АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ"
          name="email"
          placeholder=""
          register={register}
          type="email"
        />
        <Input
          error={errors.password ? true : false}
          id="password"
          label="ПАРОЛЬ"
          name="password"
          placeholder=""
          register={register}
          type="password"
        />
        <div className="mb-6 flex justify-between">
          {!isValid && (
            <p className="text-xs text-[#FF6F6F] md:text-base">
              {errors.email?.message || errors.password?.message}
            </p>
          )}
          <a className="text-xs text-[#7C7C7C] md:text-base" href="#">
            Забыли пароль?
          </a>
        </div>
        <Input
          id="remember_password"
          label="Запомнить аккаунт"
          name="remember_password"
          register={register}
          type="checkbox"
        />
        {/* <Button disable={!isValid}>Войти</Button> */}
        <Button
          background="from-light-green to-light-blue bg-gradient-to-r"
          disable={!isValid}
          textColor="text-white"
        >
          {'Войти'}
        </Button>
      </fieldset>
      <div className="mt-5 flex items-center justify-between">
        <Link className="text-xs font-light text-[#07836C] md:text-base" to="/register">
          Нужна учетная запись?
        </Link>
        <button
          className="text-xs font-light text-[#3076B8] md:text-base"
          onClick={() => setIsModalOpen(true)}
        >
          Связаться с нами
        </button>
      </div>
      <ModalContact open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </form>
  )
}

export default AuthForm
