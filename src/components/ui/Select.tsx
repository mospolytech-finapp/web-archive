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

const Select = ({ ...props }: SelectProps) => {
  const [selectedType, setSelectedType] = useState('')
  const [value, setValue] = useState(props.value ?? '')

  const handleTypeChange = (event: { target: { value: SetStateAction<string> } }) => {
    if (event.target.value === 'доходы' || event.target.value === 'расходы') {
      setSelectedType(event.target.value)
    }
  }

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
        value={value}
        onChange={(e) => {
          handleTypeChange(e)
          setValue(e.target.value)
        }}
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((option) => (
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
