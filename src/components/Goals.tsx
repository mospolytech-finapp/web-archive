import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

import Input from './ui/Input'
import ModalContact from './ui/ModalContact'
import GoalDonutChart from './ui/GoalDonutChart'
import GoalProgressBar from './ui/GoalProgressBar'
import ModalInputsBtns from './ui/modals/ModalInputsBtns'
import ModalBtns from './ui/modals/ModalBtns'

const schema = z.object({
  goal_name: z.string(),
  start_date: z.string(),
  finish_date: z.string(),
  goal_amount: z.string(),
  current_amount: z.string(),
  hh: z.string(),
  dd: z.string(),
  mm: z.string()
})

const tmpData = {
  goal_name: 'Покупка машины',
  start_date: '16.04.2023',
  finish_date: '29.11.2023',
  goal_amount: '2 345 000',
  current_amount: '1 999 542',
  hh: '07',
  dd: '13',
  mm: '07'
}
const Goals = () => {
  const { register } = useForm({
    resolver: zodResolver(schema)
  })
  const [isModalInputDeleteOpen, setIsModalInputDeleteOpen] = useState(false)
  const [isModalInputDepositOpen, setIsModalInputDepositOpen] = useState(false)
  const [isModalInputSubtractOpen, setIsModalInputSubtractOpen] = useState(false)
  const [isModalBtnOpen, setIsModalBtnOpen] = useState(false)

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
          {tmpData.goal_name}
        </h2>
      </div>
      <div className="flex flex-col gap-28 xl:flex-row">
        <div
          className="
        max-w-xs
        mx-auto
        {/*bg-[#D2D2D2] */}
        flex
        justify-start
        items-center
        flex-col
        md:w-96
        xl:m-0"
        >
          <div
            className="
          mb-10
          max-w-xs"
          >
            <GoalDonutChart percent={100} />
          </div>
          <div className="mx-auto mb-14 w-fit">
            <span
              className="
            text-3xl
            font-light
            "
            >
              Осталось:
            </span>
            <span
              className="
            relative
            text-5xl
            font-light
            after:absolute
            after:-bottom-3
            after:left-0
            after:text-sm
            after:content-['месяцев']
            "
            >
              {tmpData.mm}
            </span>
            <span
              className="
            relative
            text-5xl
            font-light
            before:content-[':']
            after:absolute
            after:-bottom-3
            after:left-4
            after:text-sm
            after:content-['дней']
            "
            >
              {tmpData.dd}
            </span>
            <span
              className="
            relative
            text-5xl
            font-light
            before:content-[':']
            after:absolute
            after:-bottom-3
            after:left-4
            after:text-sm
            after:content-['часов']
            "
            >
              {tmpData.hh}
            </span>
          </div>
          <div className="mb-6 w-60 md:w-80">
            <GoalProgressBar progress={90} progressText="345 050" />
          </div>
          <div
            className="flex
          w-full
          items-center
          justify-between
          gap-6
          md:ml-6
          "
          >
            <button
              className="
              focus:border-blue-focus
              w-full
              rounded-full
              bg-[#202020]/80
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
                setIsModalInputSubtractOpen(true)
              }}
            >
              Вычесть
            </button>
            <button
              className="
              focus:border-blue-focus
              w-full
              rounded-full
              bg-[#202020]/80
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
                setIsModalInputDepositOpen(true)
              }}
            >
              Пополнить
            </button>
          </div>
        </div>
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
          <fieldset className="mb-11 grid w-72 md:w-96">
            <Input
              disabled={true}
              id="start_date"
              label="Дата открытия"
              name="start_date"
              register={register}
              type="text"
              value={tmpData.start_date}
            />
            <Input
              disabled={true}
              id="finish_date"
              label="Дата достижения"
              name="finish_date"
              register={register}
              type="text"
              value={tmpData.finish_date}
            />
            <Input
              disabled={true}
              id="goal_amount"
              label="Сумма цели"
              name="goal_amount"
              register={register}
              type="text"
              value={tmpData.goal_amount}
            />
            <Input
              disabled={true}
              id="current_amount"
              label="Сумма (факт)"
              name="current_amount"
              register={register}
              type="text"
              value={tmpData.current_amount}
            />
          </fieldset>
          <div className="flex justify-between gap-8">
            {/* To-do сделать button через Компонент Button.tsx */}
            <button
              className="
              from-light-green
              to-light-blue
              active:shadow-custom focus:border-blue-focus
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
                setIsModalInputDeleteOpen(true)
              }}
            >
              Изменить
            </button>
            <button
              className="
              from-light-blue
              to-purple-active-link
              active:shadow-custom focus:border-blue-focus
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
                setIsModalBtnOpen(true)
              }}
            >
              Удалить
            </button>
          </div>
          <ModalBtns
            buttons={[
              {
                background:
                  'bg-gradient-to-r\n' +
                  '              from-light-green\n' +
                  '              to-light-blue active:shadow-custom',
                textColor: 'text-white',
                children: 'Да',
                onClick: () => console.log('Submitted')
              },
              {
                background:
                  'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
                textColor: 'text-white',
                children: 'Отмена',
                onClick: () => console.log('Submitted')
              }
            ]}
            close="Назад"
            direction="flex-row"
            open={isModalBtnOpen}
            title={'Удалить цель ' + `${tmpData.goal_name}` + '?'}
            onClose={() => setIsModalBtnOpen(false)}
          />
          <ModalInputsBtns
            buttons={[
              {
                background:
                  'from-light-green to-purple-active-link active:shadow-custom bg-gradient-to-r',
                textColor: 'text-white',
                children: 'Сохранить изменения',
                onClick: () => console.log('Submitted')
              }
            ]}
            close="Назад"
            inputs={[
              {
                id: '',
                label: 'Название цели',
                placeholder: `${tmpData.goal_name}`,
                name: 'goal_name',
                type: 'text'
              },
              {
                id: '',
                label: 'Дата открытия',
                placeholder: `${tmpData.start_date}`,
                name: 'start_date',
                type: 'text'
              },
              {
                id: '',
                label: 'Дата достижения',
                placeholder: `${tmpData.finish_date}`,
                name: 'finish_date',
                type: 'text'
              },
              {
                id: '',
                label: 'Сумма цели',
                placeholder: `${tmpData.goal_amount}`,
                name: 'goal_amount',
                type: 'text'
              },
              {
                id: '',
                label: 'Накоплено',
                placeholder: `${tmpData.current_amount}`,
                name: 'current_amount',
                type: 'text'
              }
            ]}
            open={isModalInputDeleteOpen}
            title={tmpData.goal_name}
            onClose={() => setIsModalInputDeleteOpen(false)}
          />
          <ModalInputsBtns
            buttons={[
              {
                background:
                  'bg-gradient-to-r\n' +
                  '              from-light-green\n' +
                  '              to-light-blue active:shadow-custom',
                textColor: 'text-white',
                children: 'Да',
                onClick: () => console.log('Submitted')
              },
              {
                background:
                  'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
                textColor: 'text-white',
                children: 'Отмена',
                onClick: () => console.log('Submitted')
              }
            ]}
            close="Назад"
            inputs={[
              {
                id: '',
                label: '25.04.2023',
                placeholder: `${tmpData.start_date}`,
                name: 'start_date',
                type: 'text'
              },
              {
                id: '',
                label: 'Не указано',
                placeholder: `${tmpData.finish_date}`,
                name: 'finish_date',
                type: 'text'
              },
              {
                id: '',
                label: 'Сумма операции',
                placeholder: `2 345`,
                name: 'current_amount',
                type: 'text'
              }
            ]}
            open={isModalInputDepositOpen}
            title={'Пополнить цель "' + `${tmpData.goal_name}` + '"'}
            onClose={() => setIsModalInputDepositOpen(false)}
          />
          <ModalInputsBtns
            buttons={[
              {
                background:
                  'bg-gradient-to-r\n' +
                  '              from-light-green\n' +
                  '              to-light-blue active:shadow-custom',
                textColor: 'text-white',
                children: 'Да',
                onClick: () => console.log('Submitted')
              },
              {
                background:
                  'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
                textColor: 'text-white',
                children: 'Отмена',
                onClick: () => console.log('Submitted')
              }
            ]}
            close="Назад"
            inputs={[
              {
                id: '',
                label: '25.04.2023',
                placeholder: `${tmpData.start_date}`,
                name: 'start_date',
                type: 'text'
              },
              {
                id: '',
                label: 'Не указано',
                placeholder: `${tmpData.finish_date}`,
                name: 'finish_date',
                type: 'text'
              },
              {
                id: '',
                label: 'Сумма операции',
                placeholder: `2 345`,
                name: 'current_amount',
                type: 'text'
              }
            ]}
            open={isModalInputSubtractOpen}
            title={'Вычесть из цели "' + `${tmpData.goal_name}` + '"'}
            onClose={() => setIsModalInputSubtractOpen(false)}
          />
        </form>
      </div>
    </div>
  )
}

export default Goals
