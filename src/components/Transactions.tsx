import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

import settings_img from '../assets/images/settings.svg'

import ModalTransaction from './ui/modals/ModalTransactions'
import ModalBtns from './ui/modals/ModalBtns'
import Button from './ui/Button'

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

const Transactions = () => {
  const { register } = useForm({
    resolver: zodResolver(schema)
  })
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalMoreOpen, setIsModalMoreOpen] = useState(false)
  const [isModalBtnOpen, setIsModalBtnOpen] = useState(false)
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false)

  const handleModalClose = () => {
    setIsModalBtnOpen(false)
    setIsModalMoreOpen(false)
  }

  return (
    <div
      className="
      h-screen
      w-screen bg-white
      {/*px-3*/}
      pt-9
      {/*sm:px-10*/}
    "
    >
      <div
        className="
        relative
        z-10
        m-auto
        flex
        flex-col
        items-center
        justify-between
        sm:max-w-xl
        sm:flex-row
        md:max-w-3xl
        lg:max-w-5xl
        2xl:max-w-7xl
        "
      >
        <h2
          className="
        from-light-green
        to-light-blue
        sm:mr-100
        w-fit
        bg-gradient-to-r
        bg-clip-text
        text-center text-2xl
        font-light
        text-transparent
        sm:text-4xl
        "
        >
          Транзакции
        </h2>
        <div
          className="
          flex
          max-w-sm
          items-center
         "
        >
          <Button
            background="from-light-green to-light-blue bg-gradient-to-r"
            textColor="text-white"
            onClick={() => {
              setIsModalFilterOpen(true)
            }}
          >
            {'Фильтры'}
          </Button>
          <Button
            background="from-light-blue to-purple-active-link bg-gradient-to-r"
            textColor="text-white"
            onClick={() => {
              setIsModalAddOpen(true)
            }}
          >
            {'Добавить'}
          </Button>
          <img alt="параметры" className="mt-3 w-4" src={settings_img} />
        </div>
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
            onClick: () => handleModalClose()
          },
          {
            background:
              'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
            textColor: 'text-white',
            children: 'Отмена',
            onClick: () => console.log('Submitted')
          }
        ]}
        close="Отмена"
        direction="flex-row"
        open={isModalBtnOpen}
        title={'Удалить транзакцию “Переводы” за 12.03.2023?'}
        onClose={() => setIsModalBtnOpen(false)}
      />
      <ModalTransaction
        buttons={[
          {
            background:
              'bg-gradient-to-r\n' +
              '              from-light-green\n' +
              '              to-light-blue active:shadow-custom',
            textColor: 'text-white',
            children: 'Сохранить',
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
        close="Отмена"
        filter={true}
        inputs={[
          {
            id: 'name',
            label: 'Название',
            placeholder: 'Магнит',
            name: 'name',
            type: 'text'
          }
        ]}
        open={isModalFilterOpen}
        select={[
          {
            id: 'type',
            label: 'Тип',
            placeholder: 'Выберете тип',
            name: 'type',
            options: [
              { value: 'доходы', label: 'доходы' },
              { value: 'расходы', label: 'расходы' }
            ]
          },
          {
            id: 'category',
            label: 'Категория',
            placeholder: 'Выберете категорию',
            name: 'category',
            options: [
              { value: 'Путешествия', label: 'Путешествия' },
              { value: 'Транспорт', label: 'Транспорт' },
              { value: 'Образование', label: 'Образование' },
              { value: 'Одежда', label: 'Одежда' },
              { value: 'Подписки', label: 'Подписки' },
              { value: 'Животные', label: 'Животные' },
              { value: 'Продукты', label: 'Продукты' },
              { value: 'Еда', label: 'Еда' },
              { value: 'Развлечения', label: 'Развлечения' },
              { value: 'Прочее', label: 'Прочее' }
            ]
          }
        ]}
        title={'Фильтры'}
        onClose={() => setIsModalFilterOpen(false)}
      />
      <ModalTransaction
        buttons={[
          {
            background:
              'bg-gradient-to-r\n' +
              '              from-light-green\n' +
              '              to-light-blue active:shadow-custom',
            textColor: 'text-white',
            children: 'Добавить',
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
        close="Отмена"
        filter={false}
        inputs={[
          {
            id: 'name',
            label: 'Название',
            placeholder: 'Магнит',
            name: 'name',
            type: 'text'
          }
        ]}
        open={isModalAddOpen}
        select={[
          {
            id: 'type',
            label: 'Тип',
            placeholder: 'Выберете тип',
            name: 'type',
            options: [
              { value: 'доходы', label: 'доходы' },
              { value: 'расходы', label: 'расходы' }
            ]
          },
          {
            id: 'category',
            label: 'Категория',
            placeholder: 'Выберете категорию',
            name: 'category',
            options: [
              { value: 'Путешествия', label: 'Путешествия' },
              { value: 'Транспорт', label: 'Транспорт' },
              { value: 'Образование', label: 'Образование' },
              { value: 'Одежда', label: 'Одежда' },
              { value: 'Подписки', label: 'Подписки' },
              { value: 'Животные', label: 'Животные' },
              { value: 'Продукты', label: 'Продукты' },
              { value: 'Еда', label: 'Еда' },
              { value: 'Развлечения', label: 'Развлечения' },
              { value: 'Прочее', label: 'Прочее' }
            ]
          }
        ]}
        title={'Транзакция'}
        onClose={() => setIsModalAddOpen(false)}
      />
      <ModalTransaction
        buttons={[
          {
            background:
              'bg-gradient-to-r\n' +
              '              from-light-green\n' +
              '              to-light-blue active:shadow-custom',
            textColor: 'text-white',
            children: 'Изменить',
            onClick: () => console.log('Submitted')
          },
          {
            background:
              'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
            textColor: 'text-white',
            children: 'Удалить',
            onClick: () => setIsModalBtnOpen(true)
          }
        ]}
        close=""
        filter={false}
        inputs={[
          {
            id: 'name',
            label: 'Название',
            placeholder: 'Магнит',
            name: 'name',
            type: 'text'
          }
        ]}
        open={isModalMoreOpen}
        select={[
          {
            id: 'type',
            label: 'Тип',
            placeholder: 'Выберете тип',
            name: 'type',
            options: [
              { value: 'доходы', label: 'доходы' },
              { value: 'расходы', label: 'расходы' }
            ]
          },
          {
            id: 'category',
            label: 'Категория',
            placeholder: 'Выберете категорию',
            name: 'category',
            options: [
              { value: 'Путешествия', label: 'Путешествия' },
              { value: 'Транспорт', label: 'Транспорт' },
              { value: 'Образование', label: 'Образование' },
              { value: 'Одежда', label: 'Одежда' },
              { value: 'Подписки', label: 'Подписки' },
              { value: 'Животные', label: 'Животные' },
              { value: 'Продукты', label: 'Продукты' },
              { value: 'Еда', label: 'Еда' },
              { value: 'Развлечения', label: 'Развлечения' },
              { value: 'Прочее', label: 'Прочее' }
            ]
          }
        ]}
        title={'Транзакция'}
        onClose={() => setIsModalMoreOpen(false)}
      />
      <ul
        className="
        mx-auto my-8
        h-4/5
        overflow-auto
        text-xs
        text-[#2B2B2B]
        sm:max-w-xl
        sm:text-lg
        md:max-w-3xl
        md:text-xl
        lg:max-w-5xl
        lg:text-2xl
        2xl:max-w-7xl
        2xl:text-3xl
        "
      >
        <li
          className="
          flex
          flex-row
          items-center
          justify-between
          border-t-2
          border-[#7C7C7C]
          py-4
          "
        >
          <div>
            <p
              className="
              w-24
              overflow-hidden
              truncate
              whitespace-nowrap
              sm:w-32
              md:w-44
              2xl:w-56
              "
            >
              Супермаркет
            </p>
            <p className="text-[#7C7C7C]">20.04.2023</p>
          </div>
          <p className="w-20 text-center 2xl:w-28">доход</p>
          <p className="w-40 text-center lg:w-56">-218 000 ₽</p>
          <button
            onClick={() => {
              setIsModalMoreOpen(true)
            }}
          >
            Подробнее
          </button>
        </li>
        <li
          className="
          flex
          flex-row
          items-center
          justify-between
          border-t-2
          border-[#7C7C7C]
          py-4
          "
        >
          <div>
            <p
              className="
              w-24
              overflow-hidden
              truncate
              whitespace-nowrap
              sm:w-32
              md:w-44
              2xl:w-56
              "
            >
              Яндекс.Музыка
            </p>
            <p className="text-[#7C7C7C]">20.04.2023</p>
          </div>
          <p className="w-20 text-center 2xl:w-28">доход</p>
          <p className="w-40 text-center lg:w-56">-218 000 000 ₽</p>
          <button
            onClick={() => {
              setIsModalMoreOpen(true)
            }}
          >
            Подробнее
          </button>
        </li>
        <li
          className="
          flex
          flex-row
          items-center
          justify-between
          border-t-2
          border-[#7C7C7C]
          py-4
          "
        >
          <div>
            <p
              className="
              w-24
              overflow-hidden
              truncate
              whitespace-nowrap
              sm:w-32
              md:w-44
              2xl:w-56
              "
            >
              Зарплата
            </p>
            <p className="text-[#7C7C7C]">20.04.2023</p>
          </div>
          <p className="w-20 text-center 2xl:w-28">расход</p>
          <p className="w-40 text-center lg:w-56">+1 ₽</p>
          <button
            onClick={() => {
              setIsModalMoreOpen(true)
            }}
          >
            Подробнее
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Transactions
