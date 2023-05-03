import { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import closeEye from '../../assets/images/close_eye.svg'
import openEye from '../../assets/images/open_eye.svg'

interface InputProps {
  id: string
  name: string
  type: string
  register: UseFormRegister<FieldValues>
  placeholder?: string
  error?: boolean
  value?: string
  disabled?: true
}

const Input = ({ ...props }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function togglePasswordVisibility(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsPasswordVisible((prevState) => !prevState)
  }

  switch (props.type) {
    case 'password':
      return (
        <div className="flex w-full content-center items-center">
          <input
            {...props.register(props.name)}
            aria-invalid={props.error}
            className={`text-light-gray placeholder:text-light-gray focus:border-blue-focus -mr-10 max-h-12 w-full appearance-none rounded-full py-4 px-6 pr-12 text-xl font-normal focus:border-2 focus:outline-0 ${
              props.error ? 'bg-error border-light-red border-2' : 'bg-[#ECECEC]}'
            }`}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            type={isPasswordVisible ? 'text' : 'password'}
          />
          <button
            className="focus:border-blue-focus border-2  border-transparent focus:border-2 focus:outline-0"
            onClick={togglePasswordVisibility}
          >
            <img
              alt={isPasswordVisible ? 'скрыть пароль' : 'показать пароль'}
              src={isPasswordVisible ? closeEye : openEye}
            />
          </button>
        </div>
      )

    case 'checkbox':
      return (
        <input
          {...props.register(props.name)}
          className="peer focus:border-blue-focus relative h-5 w-5 shrink-0 appearance-none rounded-sm
                  border
                  bg-[#ECECEC]
                  checked:bg-[url('assets/images/check_mark.svg')]
                  checked:bg-[length:20px]
                  checked:bg-no-repeat
                  checked:content-['']
                  hover:ring
                  hover:ring-gray-300 focus:border-2 focus:outline-0"
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
        />
      )

    default:
      return (
        <input
          {...props.register(props.name)}
          aria-invalid={props.error}
          className={`text-light-gray placeholder:text-light-gray focus:border-blue-focus max-h-12
          w-full rounded-full py-4 px-6 text-xl font-normal focus:border-2 focus:outline-0 ${
            props.error ? 'bg-error border-light-red border-2' : 'bg-[#ECECEC]}'
          }
          ${props?.disabled ? 'disabled disabled:bg-white' : ''}
          `}
          disabled={props.disabled}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
        />
      )
  }
}

export default Input
