import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'

import Input from './ui/Input'
import Button from './ui/Button'

const schema = z.object({
  surname: z.string().min(1, { message: 'Заполните обязательные поля' }),
  name: z.string().min(1, { message: 'Заполните обязательные поля' }),
  patronymic: z.string(),
  password: z.string().min(8, { message: 'Заполните обязательные поля' }),
  email: z.string().email({ message: 'Неверный адрес эл. почты' }),
  date: z.coerce
    .date()
    .max(new Date(new Date().getFullYear() - 14, new Date().getMonth(), new Date().getDate()), {
      message: 'Возраст должен быть более 14 лет'
    }),
  gender: z.string()
})

const RegisterForm = () => {
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
        <legend className="from-light-green-text to-light-blue-text mb-10 bg-gradient-to-r bg-clip-text text-center text-2xl font-medium text-transparent md:text-2xl">
          Создать учетную запись
        </legend>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="surname">
          <span className="text-[#2B2B2B] sm:text-base md:text-xl">Фамилия*</span>
          <Input id="surname" name="surname" register={register} type="text" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="name">
          <span className="text-[#2B2B2B] sm:text-base md:text-xl">Имя*</span>
          <Input id="name" name="name" register={register} type="text" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="patronymic">
          <span className="text-[#2B2B2B] sm:text-base md:text-xl">Отчество</span>
          <Input id="patronymic" name="patronymic" register={register} type="text" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="password">
          <span className="text-[#2B2B2B] sm:text-base md:text-xl">Пароль*</span>
          <Input id="password" name="password" register={register} type="password" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="email">
          <span className="text-[#2B2B2B] sm:text-base md:text-xl">E-mail*</span>
          <Input id="email" name="email" register={register} type="email" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="date">
          <span className="text-[#2B2B2B] sm:text-base md:text-xl">Дата рождения*</span>
          <Input id="date" name="date" register={register} type="date" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start" htmlFor="gender">
          <span className="text-[#2B2B2B] sm:text-base md:text-xl">Пол</span>
          <select
            className="text-light-gray max-h-12 w-full appearance-none rounded-full bg-[#ECECEC] py-3 px-6 font-normal sm:text-base md:text-xl "
            {...register('gender')}
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="other">Другой</option>
          </select>
        </label>
        <div className="mb-5 flex justify-between">
          {(errors.surname?.message ||
            errors.name?.message ||
            errors.password?.message ||
            errors.email?.message ||
            errors.date?.message) && (
            <p className="text-normal text-xs text-[#FF6F6F] md:text-base">
              {errors.surname?.message ||
                errors.name?.message ||
                errors.password?.message ||
                errors.email?.message ||
                errors.date?.message}
            </p>
          )}
          <span className="text-xs text-[#7C7C7C] md:text-base">*Обязательное поле для ввода</span>
        </div>
        <Button>Продолжить</Button>
      </fieldset>
      <div className="mt-4 flex items-center justify-between">
        <Link className="text-xs font-light text-[#07836C] md:text-base" to="/auth">
          Уже зарегистрированы?
        </Link>
        <button className="text-xs font-light text-[#3076B8] md:text-base">Связаться с нами</button>
      </div>
    </form>
  )
}

export default RegisterForm
