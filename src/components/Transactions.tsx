import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import ITransactionData from 'types/transaction'
import ICategoryData from 'types/category'

import TransactionDataService from '../services/transaction-service'
import settings_img from '../assets/images/settings.svg'
import CategoryDataService from '../services/category-service'

import ModalTransaction from './ui/modals/ModalTransactions'
import ModalBtns from './ui/modals/ModalBtns'
import ModalInputsBtns from './ui/modals/ModalInputsBtns'
import Button from './ui/Button'

const filterSchema = z.object({
  // type: z.string(),
  category: z.number(),
  name: z.string(),
  amount_min: z.number(),
  amount_max: z.number(),
  date_min: z.string(),
  date_max: z.string(),
  description: z.string()
})

const transactionSchema = z.object({
  name: z.string(),
  amount: z.string(),
  date: z.string(),
  time: z.string(),
  description: z.string(),
  category: z.number(),
  type: z.string()
})

const Transactions = () => {
  const modalEditForm = useForm({
    resolver: zodResolver(transactionSchema)
  })
  const [transactions, setTransactions] = useState<Array<ITransactionData>>([])
  const [categories, setCategories] = useState<Array<ICategoryData>>([])
  const [selectedTransaction, setSelectedTransaction] = useState<ITransactionData>()
  const [filterMap, setFilterMap] = useState<Map<string, string | number>>()

  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalMoreOpen, setIsModalMoreOpen] = useState(false)
  const [isModalBtnOpen, setIsModalBtnOpen] = useState(false)
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false)

  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false)
  const [isModalSgnsMoreOpen, setIsModalSgnsMoreOpen] = useState(false)
  const [isModalSgnsType, setIsModalSgnsType] = useState('')
  const [isModalSgnsAdd, setIsModalSgnsAdd] = useState(false)
  const [isModalSgnsChange, setIsModalSgnsChange] = useState(false)
  const [isModalSgnsChangeValue, setIsModalSgnsChangeValue] = useState('')

  const [loading, setLoading] = useState(true)

  const modalAddTransaction = useForm({
    resolver: zodResolver(transactionSchema)
  })

  const modalFilterTransaction = useForm({
    resolver: zodResolver(filterSchema)
  })

  const handleModalClose = () => {
    setIsModalBtnOpen(false)
    setIsModalMoreOpen(false)
  }

  async function fetchTransactions() {
    try {
      const response = await TransactionDataService.getAll()

      setTransactions(response.data)

      return response.status
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchCategories() {
    try {
      const response = await CategoryDataService.getAll()

      setCategories(response.data)

      return response.status
    } catch (err) {
      console.error(err)
    }
  }

  const filterTransactions = () => {
    setLoading(true)
    const isNegative = modalFilterTransaction.watch('type') === 'расходы'

    const updatedFilterMap = new Map(
      Object.entries(modalFilterTransaction.watch())
        .filter(
          ([key, value]) =>
            value !== '' && value !== undefined && Object.keys(filterSchema.shape).includes(key)
        )
        .map(([key, value]) => {
          if (key === 'category') {
            return [key, categories.find((category) => category.name === value)?.id]
          }

          return [key, value]
        })
        .reduce((map, [key, value]) => {
          map.set(key, value)

          return map
        }, new Map())
    )

    if (updatedFilterMap !== undefined) {
      if (isNegative) {
        const amountMin = updatedFilterMap.get('amount_min')
        const amountMax = updatedFilterMap.get('amount_max')

        if (amountMin !== undefined && amountMax !== undefined) {
          updatedFilterMap.set('amount_min', -Math.abs(amountMax))
          updatedFilterMap.set('amount_max', -Math.abs(amountMin))
        } else if (amountMin === undefined && amountMax !== undefined) {
          updatedFilterMap.set('amount_min', -Math.abs(amountMax))
          updatedFilterMap.delete('amount_max')
        } else if (amountMin !== undefined && amountMax === undefined) {
          updatedFilterMap.set('amount_max', -Math.abs(amountMin))
          updatedFilterMap.delete('amount_min')
        } else {
          updatedFilterMap.set('amount_max', 0)
        }
      } else if (
        modalFilterTransaction.watch('type') === 'доходы' &&
        !updatedFilterMap.has('amount_min')
      ) {
        updatedFilterMap.set('amount_min', 0)
      }
    }

    setFilterMap(updatedFilterMap)
  }

  useEffect(() => {
    const fetchData = async () => {
      let transactionsStatus = null
      let categoriesStatus = null

      while (transactionsStatus !== 200) {
        transactionsStatus = await fetchTransactions()
      }

      while (categoriesStatus !== 200) {
        categoriesStatus = await fetchCategories()
      }
    }

    fetchData()
    setLoading(false)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TransactionDataService.getAll(filterMap)

        setTransactions(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
    setLoading(false)
  }, [filterMap])

  const createTransaction = async (data: FieldValues) => {
    try {
      const response = await TransactionDataService.create({
        name: data.name !== '' ? data.name : null,
        amount: data.amount,
        date: data.date,
        time: data.time !== '' ? data.time : null,
        description: data.description !== '' ? data.description : null,
        category: categories.find((category) => category.name == data.category)?.id ?? 0
      })

      setTransactions(() => [...transactions, response.data])
    } catch (err) {
      console.error(err)
    }
  }

  const editTransaction = async (id: number, data: FieldValues) => {
    try {
      const response = await TransactionDataService.update(id, {
        name: data.name !== '' ? data.name : null,
        amount: data.amount,
        date: data.date,
        time: data.time !== '' ? data.time : null,
        description: data.description !== '' ? data.description : null,
        category: categories.find((category) => category.name == data.category)?.id ?? 0
      })

      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.id == id) {
          return response.data
        }

        return transaction
      })

      setTransactions(updatedTransactions)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTransaction = async (id: number) => {
    try {
      const response = await TransactionDataService.delete(id)

      setTransactions(transactions.filter((transaction) => transaction.id != id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className="
      h-screen
      w-full
      bg-white
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
          {/* <button
            onClick={() => {
              setIsModalSettingsOpen(true)
            }}
          >
            <img alt="параметры" className="mt-3 w-4" src={settings_img} />
          </button> */}
        </div>
      </div>
      <ModalBtns
        buttons={[
          {
            background: 'bg-white',
            textColor: 'text-black',
            children: 'Доходы',
            onClick: () => {
              setIsModalSgnsMoreOpen(true)
              setIsModalSgnsType('доходов')
              setIsModalSettingsOpen(false)
            }
          },
          {
            background: 'bg-white',
            textColor: 'text-black',
            children: 'Расходы',
            onClick: () => {
              setIsModalSgnsMoreOpen(true)
              setIsModalSgnsType('расходов')
              setIsModalSettingsOpen(false)
            }
          }
        ]}
        close=""
        direction="flex-col"
        open={isModalSettingsOpen}
        title="Категории"
        onClose={() => setIsModalSettingsOpen(false)}
      />
      <ModalInputsBtns
        buttons={[
          {
            background: 'from-light-green to-light-blue bg-gradient-to-r',
            textColor: 'text-white',
            children: 'сохранить',
            onClick: () => {
              setIsModalSgnsMoreOpen(false)
            }
          },
          {
            background: 'from-light-blue to-purple-active-link bg-gradient-to-r',
            textColor: 'text-white',
            children: 'Добавить',
            onClick: () => {
              setIsModalSgnsAdd(true)
              setIsModalSgnsMoreOpen(false)
            }
          }
        ]}
        close="сохранить"
        inputs={[
          {
            id: '',
            label: '',
            placeholder: `Зарплата`,
            name: '1',
            type: 'button',
            onClick: () => {
              setIsModalSgnsChange(true)
              setIsModalSgnsChangeValue(`Зарплата`)
              setIsModalSgnsMoreOpen(false)
            }
          },
          {
            id: '',
            label: '',
            placeholder: `Пособия`,
            name: '2',
            type: 'button',
            onClick: () => {
              setIsModalSgnsChange(true)
              setIsModalSgnsChangeValue(`Пособия`)
              setIsModalSgnsMoreOpen(false)
            }
          },
          {
            id: '',
            label: '',
            placeholder: `Подарок`,
            name: '3',
            type: 'button',
            onClick: () => {
              setIsModalSgnsChange(true)
              setIsModalSgnsChangeValue(`Подарок`)
              setIsModalSgnsMoreOpen(false)
            }
          }
        ]}
        open={isModalSgnsMoreOpen}
        register={modalEditForm.register}
        title={`Категории ${isModalSgnsType}`}
        onClose={() => setIsModalSgnsMoreOpen(false)}
      />
      <ModalInputsBtns
        buttons={[
          {
            background: 'from-light-green to-light-blue bg-gradient-to-r',
            textColor: 'text-white',
            children: 'Изменить',
            onClick: () => {
              setIsModalSgnsChange(false)
            }
          }
        ]}
        close=""
        inputs={[
          {
            id: '',
            label: '',
            placeholder: `${isModalSgnsChangeValue}`,
            name: `${isModalSgnsChangeValue}`,
            type: 'text',
            onClick: () => {
              null
            }
          }
        ]}
        open={isModalSgnsChange}
        register={modalEditForm.register}
        title={`Изменение категории ${isModalSgnsType}`}
        onClose={() => setIsModalSgnsChange(false)}
      />
      <ModalInputsBtns
        buttons={[
          {
            background: 'from-light-blue to-purple-active-link bg-gradient-to-r',
            textColor: 'text-white',
            children: 'сохранить',
            onClick: () => {
              setIsModalSgnsAdd(false)
            }
          }
        ]}
        close=""
        inputs={[
          {
            id: '',
            label: '',
            placeholder: `Введите название`,
            name: 'new',
            type: 'text',
            onClick: () => {
              null
            }
          }
        ]}
        open={isModalSgnsAdd}
        register={modalEditForm.register}
        title={`Новая категория ${isModalSgnsType}`}
        onClose={() => setIsModalSgnsAdd(false)}
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
            onClick: () => {
              setIsModalFilterOpen(false)
              filterTransactions()
            }
          },
          {
            background:
              'bg-gradient-to-r from-light-blue to-purple-active-link active:shadow-custom',
            textColor: 'text-white',
            children: 'Отмена',
            onClick: () => {
              modalFilterTransaction.reset()
              setFilterMap(undefined)
            }
          }
        ]}
        close="Отмена"
        filter={true}
        inputs={[
          {
            id: 'name',
            label: 'Название',
            placeholder: 'Введите название',
            name: 'name',
            type: 'text',
            onClick: () => {
              null
            }
          }
        ]}
        open={isModalFilterOpen}
        register={modalFilterTransaction.register}
        select={[
          {
            id: 'type',
            label: 'Тип',
            placeholder: 'Выберите тип',
            name: 'type',
            options: [
              { value: 'доходы', label: 'доходы' },
              { value: 'расходы', label: 'расходы' }
            ]
          },
          {
            id: 'category',
            label: 'Категория',
            placeholder: 'Выберите категорию',
            name: 'category',
            options: categories.map((category) => ({ value: category.name, label: category.name }))
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
            onClick: () => {
              setIsModalAddOpen(false)
              if (modalAddTransaction.watch('type') == 'расходы')
                modalAddTransaction.setValue(
                  'amount',
                  -parseInt(modalAddTransaction.watch('amount'), 10)
                )
              createTransaction(modalAddTransaction.watch())
              modalAddTransaction.reset()
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
        filter={false}
        inputs={[
          {
            id: 'name',
            label: 'Название',
            placeholder: 'Введите название',
            name: 'name',
            type: 'text',
            onClick: () => {
              null
            }
          }
        ]}
        open={isModalAddOpen}
        register={modalAddTransaction.register}
        select={[
          {
            id: 'type',
            label: 'Тип',
            placeholder: 'Выберите тип',
            name: 'type',
            options: [
              { value: 'доходы', label: 'доходы' },
              { value: 'расходы', label: 'расходы' }
            ]
          },
          {
            id: 'category',
            label: 'Категория',
            placeholder: 'Выберите категорию',
            name: 'category',
            options: categories.map((category) => ({ value: category.name, label: category.name }))
          }
        ]}
        title={'Транзакция'}
        onClose={() => {
          setIsModalAddOpen(false)
          modalAddTransaction.reset()
        }}
      />
      {selectedTransaction && (
        <>
          <ModalTransaction
            buttons={[
              {
                background:
                  'bg-gradient-to-r\n' +
                  '              from-light-green\n' +
                  '              to-light-blue active:shadow-custom',
                textColor: 'text-white',
                children: 'Изменить',
                onClick: () => {
                  if (modalAddTransaction.watch('type') == 'расходы')
                    modalAddTransaction.setValue(
                      'amount',
                      -parseInt(modalAddTransaction.watch('amount'), 10)
                    )

                  editTransaction(selectedTransaction.id!, modalAddTransaction.watch())
                  modalAddTransaction.reset()
                  setIsModalMoreOpen(false)
                }
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
                placeholder: selectedTransaction.name,
                name: 'name',
                type: 'text',
                value: selectedTransaction.name,
                onClick: () => {
                  null
                }
              }
            ]}
            open={isModalMoreOpen}
            register={modalAddTransaction.register}
            select={[
              {
                id: 'type',
                label: 'Тип',
                placeholder: 'Выберите тип',
                name: 'type',
                options: [
                  { value: 'доходы', label: 'доходы' },
                  { value: 'расходы', label: 'расходы' }
                ],
                value: parseFloat(selectedTransaction.amount) >= 0 ? 'доходы' : 'расходы'
              },
              {
                id: 'category',
                label: 'Категория',
                placeholder: 'Выберите категорию',
                name: 'category',
                options: categories.map((category) => ({
                  value: category.name,
                  label: category.name
                })),
                value:
                  categories.find((category) => category.id == selectedTransaction.category)
                    ?.name ?? ''
              }
            ]}
            title={'Транзакция'}
            transaction={selectedTransaction}
            onClose={() => {
              setIsModalMoreOpen(false)
              modalAddTransaction.reset()
              setSelectedTransaction(undefined)
            }}
          />
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
                  deleteTransaction(selectedTransaction.id!)
                  handleModalClose()
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
            open={isModalBtnOpen}
            title={`Удалить транзакцию “${selectedTransaction.name}” за ${selectedTransaction.date
              .split('-')
              .reverse()
              .join('.')}?`}
            onClose={() => setIsModalBtnOpen(false)}
          />
        </>
      )}
      {loading ? (
        <p className="text-center align-middle">Loading</p>
      ) : (
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
          {transactions.map((transaction) => (
            <>
              <li
                key={transaction.id}
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
                    {transaction.name}
                  </p>
                  <p className="text-[#7C7C7C]">
                    {transaction.date.split('-').reverse().join('.').toString()}
                  </p>
                </div>

                <p className="w-40 text-center lg:w-56">
                  {parseFloat(transaction.amount) > 0 ? '+' : ''}
                  {parseFloat(transaction.amount).toLocaleString()} ₽
                </p>
                <p className="w-20 text-center 2xl:w-28">
                  {parseFloat(transaction.amount) > 0 ? 'доход' : 'расход'}
                </p>
                <button
                  onClick={() => {
                    setSelectedTransaction(transaction)
                    setIsModalMoreOpen(true)
                  }}
                >
                  Подробнее
                </button>
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Transactions
