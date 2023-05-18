import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useEffect } from 'react'
import IGoalData from 'types/goal'

import DateService from '../services/date-service'
import GoalDataService from '../services/goal-service'

import Input from './ui/Input'
import GoalDonutChart from './ui/GoalDonutChart'
import GoalProgressBar from './ui/GoalProgressBar'
import ModalInputsBtns from './ui/modals/ModalInputsBtns'
import ModalBtns from './ui/modals/ModalBtns'

const goalSchema = z.object({
  name: z.string(),
  opening_date: z.string(),
  achievement_date: z.string(),
  amount_target: z.string(),
  amount_now: z.string()
})

const goalBalanceSchema = z.object({
  date: z.date(),
  time: z.string().datetime(),
  amount: z.number()
})

const Goal = ({ ...props }: IGoalData) => {
  const [goal, setGoal] = useState<IGoalData>({ ...props })
  const [time, setTime] = useState<Date>(new Date())

  const modalEditForm = useForm({
    resolver: zodResolver(goalSchema)
  })

  const modalDepositForm = useForm({
    resolver: zodResolver(goalBalanceSchema)
  })

  const modalSubtractForm = useForm({
    resolver: zodResolver(goalBalanceSchema)
  })

  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDepositOpen, setIsModalDepositOpen] = useState(false)
  const [isModalSubtractOpen, setIsModalSubtractOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GoalDataService.get(props.id)

        setGoal({
          id: response.data.id,
          name: response.data.name,
          opening_date: response.data.opening_date,
          achievement_date: response.data.achievement_date,
          amount_target: parseInt(response.data.amount_target, 10).toString(),
          amount_now: parseInt(response.data.amount_now ?? '0', 10).toString()
        })

        setTime(
          DateService.dif(
            new Date(response.data.opening_date),
            new Date(response.data.achievement_date)
          )
        )

        return response.status
      } catch (err) {
        console.error(err)
      }
    }

    const fetchGoal = async () => {
      let fetchStatus = null

      while (fetchStatus !== 200) {
        fetchStatus = await fetchData()
      }
    }

    fetchGoal()
  }, [])

  const createTransaction = async (data: FieldValues) => {
    try {
      const response = await GoalDataService.createTransaction(goal.id, {
        date: data.date,
        time: data.time,
        amount: data.amount
      })

      setGoal({
        id: goal.id,
        name: goal.name,
        opening_date: goal.opening_date,
        achievement_date: goal.achievement_date,
        amount_target: goal.amount_target,
        amount_now: Math.floor(
          parseFloat(goal.amount_now ?? '0') + parseFloat(response.data.amount)
        ).toString()
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteGoal = async () => {
    try {
      const response = await GoalDataService.delete(goal.id)
    } catch (err) {
      console.error(err)
    }
  }

  const updateGoal = async (data: FieldValues) => {
    try {
      const response = await GoalDataService.update(goal.id, {
        id: goal.id,
        name: data.name,
        opening_date: data.opening_date,
        achievement_date: data.achievement_date,
        amount_target: data.amount_target,
        amount_now: data.amount_now
      })

      setGoal({
        id: goal.id,
        name: response.data.name,
        opening_date: response.data.opening_date,
        achievement_date: response.data.achievement_date,
        amount_target: response.data.amount_target,
        amount_now: response.data.amount_now
      })
      setTime(
        DateService.dif(
          new Date(response.data.opening_date),
          new Date(response.data.achievement_date)
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  const createGoal = async (data: FieldValues) => {
    try {
      const response = await GoalDataService.create({
        id: goal.id,
        name: data.name,
        opening_date: data.opening_date,
        achievement_date: data.achievement_date,
        amount_target: data.amount_target,
        amount_now: data.amount_now
      })

      setGoal({
        id: goal.id,
        name: response.data.name,
        opening_date: response.data.opening_date,
        achievement_date: response.data.achievement_date,
        amount_target: response.data.amount_target,
        amount_now: response.data.amount_now
      })

      setTime(
        DateService.dif(
          new Date(response.data.opening_date),
          new Date(response.data.achievement_date)
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className="
      bg-goal-bg
      mx-auto
    max-w-6xl
    rounded-b-2xl bg-[#D2D2D2]
    bg-contain
    bg-right-bottom
    bg-no-repeat
    pt-9
    pb-8
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
          {goal.name}
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
            <GoalDonutChart
              percent={Math.round(
                (parseFloat(goal.amount_now ?? '0') / parseFloat(goal.amount_target)) * 100
              )}
            />
          </div>
          <div className="mx-auto mb-14 w-max">
            <span
              className="
            text-3xl
            font-light
            block
            mb-2
            lg:inline
            lg:mx-6
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
              {`${time?.getMonth() + (time.getFullYear() - 1970) * 12 < 10 ? '0' : ''}${(
                time?.getMonth() +
                (time.getFullYear() - 1970) * 12
              ).toString()}`}
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
              {`${time?.getDay() < 10 ? '0' : ''}${time?.getDay().toString()}`}
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
              {`${time?.getHours() < 10 ? '0' : ''}${time?.getHours().toString()}`}
            </span>
          </div>
          <div className="mb-6 w-60 md:w-80">
            <GoalProgressBar
              progress={Math.round(
                (parseFloat(goal.amount_now ?? '0') / parseFloat(goal.amount_target)) * 100
              )}
              progressText={Math.max(
                parseFloat(goal.amount_target) - parseFloat(goal.amount_now ?? '0'),
                0
              ).toLocaleString()}
            />
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
                setIsModalSubtractOpen(true)
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
                setIsModalDepositOpen(true)
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
              id="opening_date"
              label="Дата открытия"
              name="opening_date"
              register={modalEditForm.register}
              type="text"
              value={goal.opening_date?.split('-').reverse().join('.')}
              onClick={() => {
                console.log(goal)
              }}
            />
            <Input
              disabled={true}
              id="achievement_date"
              label="Дата достижения"
              name="achievement_date"
              register={modalEditForm.register}
              type="text"
              value={goal.achievement_date.split('-').reverse().join('.')}
              onClick={() => {
                null
              }}
            />
            <Input
              disabled={true}
              id="amount_target"
              label="Сумма цели"
              name="amount_target"
              register={modalEditForm.register}
              type="text"
              value={parseInt(goal.amount_target, 10).toLocaleString()}
              onClick={() => {
                null
              }}
            />
            <Input
              disabled={true}
              id="amount_now"
              label="Сумма (факт)"
              name="amount_now"
              register={modalEditForm.register}
              type="text"
              value={parseInt(goal.amount_now ?? '0', 10).toLocaleString()}
              onClick={() => {
                null
              }}
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
                setIsModalEditOpen(true)
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
                setIsModalDeleteOpen(true)
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
                onClick: () => {
                  deleteGoal()
                  setIsModalDeleteOpen(false)
                }
              },
              {
                background:
                  'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
                textColor: 'text-white',
                children: 'Отмена',
                onClick: () => null
              }
            ]}
            close="Отмена"
            direction="flex-row"
            open={isModalDeleteOpen}
            title={'Удалить цель ' + `${goal.name}` + '?'}
            onClose={() => setIsModalDeleteOpen(false)}
          />
          <ModalInputsBtns
            buttons={[
              {
                background:
                  'from-light-green to-purple-active-link active:shadow-custom bg-gradient-to-r',
                textColor: 'text-white',
                children: 'Сохранить изменения',
                onClick: () => {
                  updateGoal(modalEditForm.watch())
                  // createGoal(modalEditForm.watch())
                  setIsModalEditOpen(false)
                  modalEditForm.reset()
                }
              }
            ]}
            close=""
            inputs={[
              {
                id: '',
                label: 'Название цели',
                placeholder: `${goal.name}`,
                name: 'name',
                type: 'text',
                value: goal.name,
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Дата открытия',
                placeholder: `${goal.opening_date}`,
                name: 'opening_date',
                type: 'date',
                value: goal.opening_date,
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Дата достижения',
                placeholder: `${goal.achievement_date}`,
                name: 'achievement_date',
                type: 'date',
                value: goal.achievement_date,
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Сумма цели',
                placeholder: `${goal.amount_target}`,
                name: 'amount_target',
                type: 'text',
                value: goal.amount_target,
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Накоплено',
                placeholder: `${goal.amount_now}`,
                name: 'amount_now',
                type: 'text',
                value: goal.amount_now,
                onClick: () => {
                  null
                }
              }
            ]}
            open={isModalEditOpen}
            register={modalEditForm.register}
            title={goal.name}
            onClose={() => setIsModalEditOpen(false)}
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
                onClick: () => {
                  createTransaction(modalDepositForm.watch())
                  setIsModalDepositOpen(false)
                  modalDepositForm.reset()
                }
              },
              {
                background:
                  'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
                textColor: 'text-white',
                children: 'Отмена',
                onClick: () => null
              }
            ]}
            close="Отмена"
            inputs={[
              {
                id: '',
                label: 'Дата операции',
                placeholder: '25.04.2023',
                name: 'date',
                type: 'date',
                value: `${new Date().toISOString().split('T')[0]}`,
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Время операции',
                placeholder: 'Не указано',
                name: 'time',
                type: 'time',
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Сумма операции',
                placeholder: '2 345',
                name: 'amount',
                type: 'text',
                onClick: () => {
                  null
                }
              }
            ]}
            open={isModalDepositOpen}
            register={modalDepositForm.register}
            title={'Пополнить цель "' + `${goal.name}` + '"'}
            onClose={() => {
              setIsModalDepositOpen(false)
            }}
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
                onClick: () => {
                  modalSubtractForm.setValue(
                    'amount',
                    -parseInt(modalSubtractForm.watch('amount'), 10)
                  )
                  createTransaction(modalSubtractForm.watch())
                  setIsModalSubtractOpen(false)
                  modalSubtractForm.reset()
                }
              },
              {
                background:
                  'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
                textColor: 'text-white',
                children: 'Отмена',
                onClick: () => null
              }
            ]}
            close="Отмена"
            inputs={[
              {
                id: '',
                label: 'Дата операции',
                placeholder: `${goal.opening_date}`,
                name: 'date',
                type: 'date',
                value: `${new Date().toISOString().split('T')[0]}`,
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Время операции',
                placeholder: `${goal.achievement_date}`,
                name: 'time',
                type: 'time',
                onClick: () => {
                  null
                }
              },
              {
                id: '',
                label: 'Сумма операции',
                placeholder: `2 345`,
                name: 'amount',
                type: 'text',
                onClick: () => {
                  null
                }
              }
            ]}
            open={isModalSubtractOpen}
            register={modalSubtractForm.register}
            title={'Вычесть из цели "' + `${goal.name}` + '"'}
            onClose={() => setIsModalSubtractOpen(false)}
          />
        </form>
      </div>
    </div>
  )
}

export default Goal
