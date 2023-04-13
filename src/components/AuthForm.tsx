import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import Input from './ui/Input'
import Button from './ui/Button'

const schema = z.object({
  login: z.string().min(1, { message: 'Неверный логин или пароль' }),
  password: z.string().min(3, { message: 'Неверный логин или пароль' }),
  remember_password: z.boolean()
})

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })
  const onSubmit = (data: object) => {
    console.log(data)
  }

  return (
    <form
      className="mx-2.5 rounded-3xl bg-[#E5E5E5CC]/80 px-2.5 py-8 font-sans font-normal tracking-normal sm:mx-0 md:max-w-md md:px-12 md:py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="grid">
        <legend className="from-light-green to-light-blue mb-10 bg-gradient-to-r bg-clip-text text-center text-2xl font-medium text-transparent md:text-2xl">
          Вход
        </legend>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="login">
          <span className="mb-3 text-xs text-[#2B2B2B] md:text-base ">
            АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ ИЛИ НОМЕР ТЕЛЕФОНА
          </span>
          <Input id="login" name="login" register={register} type="text" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="password">
          <span className="mb-3 text-xs text-[#2B2B2B] md:text-base">ПАРОЛЬ</span>
          <Input id="password" name="password" register={register} type="password" />
        </label>
        <div className="mb-6 flex justify-between">
          {(errors.login?.message || errors.password?.message) && (
            <p className="text-normal text-xs text-[#FF6F6F] md:text-base">
              {errors.login?.message || errors.password?.message}
            </p>
          )}
          <a className="text-xs text-[#7C7C7C] md:text-base" href="#">
            Забыли пароль?
          </a>
        </div>
        <label className="mb-9 flex items-center" htmlFor="remember_password">
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
        <Button>Войти</Button>
      </fieldset>
      <div className="mt-6 flex items-center justify-between">
        <a className="text-xs font-light text-[#07836C] md:text-base" href="#">
          Нужна учетная запись?
        </a>
        <a className="text-xs font-light text-[#3076B8] md:text-base" href="#">
          Связаться с нами
        </a>
      </div>
    </form>
  )
}

export default AuthForm
