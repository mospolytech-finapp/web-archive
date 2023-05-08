import { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps {
  id: string
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  placeholder?: string
  error?: boolean
  value?: string
  disabled?: true
  options: Array<{ value: string; label: string }>
}

const Select = ({ ...props }: SelectProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function togglePasswordVisibility(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsPasswordVisible((prevState) => !prevState)
  }

  return (
    <div className="mb-2">
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
        `}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        value={props.value}
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
