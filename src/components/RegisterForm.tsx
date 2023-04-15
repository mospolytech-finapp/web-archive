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
  date: z.coerce.date(),
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
      className="mx-2.5 rounded-3xl bg-[#E5E5E5CC]/80 py-16 px-8 font-sans font-normal tracking-normal sm:mx-0 md:max-w-md md:px-14 md:py-8 xl:px-11 xl:py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="grid">
        <legend className="from-light-green-text to-light-blue-text mb-4 bg-gradient-to-r bg-clip-text text-center text-xl font-medium text-transparent sm:text-2xl md:mb-10">
          Создать учетную запись
        </legend>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="surname"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Фамилия*</span>
          <Input id="surname" name="surname" register={register} type="text" />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="name"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Имя*</span>
          <Input id="name" name="name" register={register} type="text" />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="patronymic"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Отчество</span>
          <Input id="patronymic" name="patronymic" register={register} type="text" />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="password"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Пароль*</span>
          <Input id="password" name="password" register={register} type="password" />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="email"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">E-mail*</span>
          <Input id="email" name="email" register={register} type="email" />
        </label>
        <label
          className="mb-2 flex flex-col items-start justify-start sm:mb-1 lg:mb-3"
          htmlFor="date"
        >
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">
            Дата рождения*
          </span>
          <Input id="date" name="date" register={register} type="date" />
        </label>
        <label className="mb-3 flex flex-col items-start justify-start sm:mb-2" htmlFor="gender">
          <span className="mb-1 text-[#2B2B2B] sm:text-base md:text-xl xl:mb-0">Пол</span>
          <select
            className="text-light-gray max-h-12 w-full appearance-none rounded-full bg-[#ECECEC] py-3 px-6 font-normal sm:text-base md:text-xl"
            {...register('gender')}
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="other">Другой</option>
          </select>
        </label>
        <div className="mb-4 flex flex-wrap justify-between">
          {(errors.surname?.message ||
            errors.name?.message ||
            errors.password?.message ||
            errors.email?.message ||
            errors.date?.message) && (
            <p className="text-normal text-sm text-[#FF6F6F] md:text-base">
              {errors.surname?.message ||
                errors.name?.message ||
                errors.password?.message ||
                errors.email?.message ||
                errors.date?.message}
            </p>
          )}
          <span className="text-sm text-[#7C7C7C] md:text-base">*Обязательное поле для ввода</span>
        </div>
        <Button>Продолжить</Button>
      </fieldset>
      <div className="mt-3 flex flex-wrap items-center justify-between lg:mt-4">
        <Link className="text-sm font-light text-[#07836C] md:text-base" to="/auth">
          Уже зарегистрированы?
        </Link>
        <button className="text-sm font-light text-[#3076B8] md:text-base">Связаться с нами</button>
      </div>
    </form>
  )
}

export default RegisterForm
