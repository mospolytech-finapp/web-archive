import { SetStateAction, useState, useEffect } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import arrow from '../../assets/images/select_arrow.svg'

interface SelectProps {
  id: string
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  placeholder?: string
  error?: boolean
  value?: string
  disabled?: boolean
  options: Array<{ value: string; label: string }>
}

const getCategoryOptions = (selectedType: string) => {
  let categoryOptions: { value: string; label: string }[] = []

  if (selectedType === 'доходы') {
    categoryOptions = [
      { value: 'Зарплата', label: 'Зарплата' },
      { value: 'Подарки', label: 'Подарки' },
      { value: 'Дивиденды', label: 'Дивиденды' }
    ]
  } else if (selectedType === 'расходы') {
    categoryOptions = [
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

  return categoryOptions
}

const Select = ({ ...props }: SelectProps) => {
  const [selectedType, setSelectedType] = useState('')

  const handleTypeChange = (event: { target: { value: SetStateAction<string> } }) => {
    if (event.target.value === 'доходы' || event.target.value === 'расходы') {
      setSelectedType(event.target.value)
    }
  }

  useEffect(() => {
    const categories = document.querySelector('#category')

    if (categories !== null) {
      categories.innerHTML = getCategoryOptions(selectedType)
        .map(
          (option) => `<option key=${option.value} value=${option.value}>${option.label}</option>`
        )
        .join('')
    }
  }, [selectedType])

  return (
    <div className="relative mb-2">
      <label className="true-gray-900 sm:text-base md:text-xl" htmlFor={props.name}>
        {props.label}
      </label>
      <select
        {...props.register(props.name)}
        aria-invalid={props.error}
        className={`text-true-gray-900 placeholder:text-light-gray h-11 max-h-12 w-full rounded-full py-2 px-6 text-xs font-normal  sm:text-lg ${
          props.error ? 'bg-error border-light-red border-2' : 'bg-[#ECECEC]}'
        }
        ${props.disabled ? 'bg-white text-black/50' : ''}
        appearance-none
        `}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={handleTypeChange}
      >
        <option value="">{props.placeholder}</option>
        {props.id != 'type'
          ? getCategoryOptions(selectedType).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
      </select>
      <img alt="select arrow" className="absolute top-11 right-5" src={arrow} />
    </div>
  )
}

export default Select
