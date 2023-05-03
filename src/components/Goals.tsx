import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

import Input from './ui/Input'
import ModalContact from './ui/ModalContact'

const schema = z.object({
  // username: z.string().email({message: 'Неверный логин или пароль'}),
  // password: z.string().nonempty({message: 'Неверный логин или пароль'}),
  // remember_password: z.boolean()
})

const tmpData = {
  start_date: '16.04.2023',
  finish_date: '29.11.2023',
  goal_amount: '2 345 000',
  current_amount: '1 999 542'
}
const Goals = () => {
  const {
    register,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema)
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div
      className="
    {/*bg-[#D2D2D2]/70 */}
    bg-[#D2D2D2]
    pt-9 pb-8
    rounded-2xl
    bg-goal-bg
    bg-contain
    {/*bg-[length:600px_600px]*/}
    bg-no-repeat
    bg-right-bottom
    "
    >
      <div
        className="
      mx-auto
      mb-9
      max-w-fit
      rounded-2xl
      bg-[#202020]
      px-5
      pt-2
      pb-1.5
      md:max-w-fit
      md:px-28"
      >
        <h2
          className="
        from-light-green
        to-light-blue
        w-fit
        bg-gradient-to-r
        bg-clip-text
        text-center
        text-2xl font-extrabold
        text-transparent
        md:text-4xl
        "
        >
          Покупка машины
        </h2>
      </div>
      <div className="flex flex-col gap-28 xl:flex-row">
        <div className="w-46 mx-auto h-40 bg-[#D2D2D2] md:w-96 xl:m-0" />
        <form
          className="rounded-3xl bg-[#E5E5E5CC]/50
        font-sans
        font-normal
        tracking-normal
        mx-auto
        px-2.5 py-8
        sm:px-6
        {/*md:max-w-lg */}
        {/*md:px-15 */}
        xl:py-4
        xl:mr-16
        "
        >
          <fieldset className="grid w-72 md:w-96">
            <label className="mb-2 flex flex-col items-start justify-start" htmlFor="start_date">
              <span
                className="mb-1
          text-xs
          font-light
          text-[#2B2B2B]
          md:text-2xl
          "
              >
                Дата открытия
              </span>
              <Input
                disabled={true}
                id="start_date"
                name="start_date"
                register={register}
                type="text"
                value={tmpData.start_date}
              />
            </label>
            <label className="mb-2 flex flex-col items-start justify-start" htmlFor="finish_date">
              <span
                className="mb-1 text-xs  font-light
          text-[#2B2B2B]
          md:text-2xl
          "
              >
                Дата достижения
              </span>
              <Input
                disabled={true}
                id="finish_date"
                name="finish_date"
                register={register}
                type="text"
                value={tmpData.finish_date}
              />
            </label>
            <label className="mb-2 flex flex-col items-start justify-start" htmlFor="goal_amount">
              <span
                className="mb-1 text-xs  font-light text-[#2B2B2B]
          md:text-2xl"
              >
                Сумма цели
              </span>
              <Input
                disabled={true}
                id="goal_amount"
                name="goal_amount"
                register={register}
                type="text"
                value={tmpData.goal_amount}
              />
            </label>
            <label
              className="mb-11 flex flex-col items-start justify-start"
              htmlFor="current_amount"
            >
              <span
                className="mb-1 text-xs  font-light
          text-[#2B2B2B]
          md:text-2xl
          "
              >
                Сумма (факт)
              </span>
              <Input
                disabled={true}
                id="current_amount"
                name="current_amount"
                register={register}
                type="text"
                value={tmpData.current_amount}
              />
            </label>
            <div className="flex justify-between gap-8">
              <button
                className="
              from-light-green to-light-blue
              active:shadow-custom
              focus:border-blue-focus
              w-full
              rounded-full
              bg-gradient-to-r
              py-3
              text-base
              font-light
              text-white
              focus:border-2
              focus:outline-0
              disabled:bg-gray-500
              disabled:bg-none
              md:text-2xl
              "
                onClick={(event) => {
                  event.stopPropagation()
                  event.preventDefault()
                  setIsModalOpen(true)
                }}
              >
                Изменить
              </button>
              <button
                className="
              from-light-blue
              to-purple-active-link active:shadow-custom
              focus:border-blue-focus
              w-full
              rounded-full
              bg-gradient-to-r
              py-3
              text-base
              font-light
              text-white
              focus:border-2
              focus:outline-0
              disabled:bg-gray-500
              disabled:bg-none
              md:text-2xl
              "
                onClick={(event) => {
                  event.stopPropagation()
                  event.preventDefault()
                  setIsModalOpen(true)
                }}
              >
                Удалить
              </button>
            </div>
          </fieldset>
          <ModalContact open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </form>
      </div>
    </div>
  )
}

export default Goals
