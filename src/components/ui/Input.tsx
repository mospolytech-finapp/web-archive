import { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import closeEye from '../../assets/images/close_eye.svg'
import openEye from '../../assets/images/open_eye.svg'

interface InputProps {
  id: string
  name: string
  type: string
  label: string
  register: UseFormRegister<FieldValues>
  placeholder?: string
  error?: boolean
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
        <div className="mb-1">
          <label className="true-gray-900 text-lg" htmlFor={props.name}>
            {props.label}
          </label>
          <div className="flex w-full content-center items-center">
            <input
              {...props.register(props.name)}
              aria-invalid={props.error}
              className={`text-true-gray-900 placeholder:text-light-gray -mr-10 max-h-12 w-full rounded-full py-4 px-6 text-xl font-normal ${
                props.error ? 'bg-error border-light-red border-2' : 'bg-[#ECECEC]}'
              }`}
              id={props.id}
              name={props.name}
              placeholder={props.placeholder}
              type={isPasswordVisible ? 'text' : 'password'}
            />
            <button onClick={togglePasswordVisibility}>
              <img
                alt={isPasswordVisible ? 'скрыть пароль' : 'показать пароль'}
                src={
                  isPasswordVisible
                    ? 'src/assets/images/close_eye.svg'
                    : 'src/assets/images/open_eye.svg'
                }
              />
            </button>
          </div>
        </div>
      )

    case 'checkbox':
      return (
        <div className="mb-5 flex items-center">
          <input
            {...props.register(props.name)}
            className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm
                    border
                    bg-[#ECECEC]
                    checked:bg-[url('./src/assets/images/check_mark.svg')]
                    checked:bg-[length:20px]
                    checked:bg-no-repeat
                    checked:content-['']
                    hover:ring 
                    hover:ring-gray-300"
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
          />
          <label
            className="ml-3 text-xs font-light text-[#2B2B2B] md:text-base"
            htmlFor={props.name}
          >
            {props.label}
          </label>
        </div>
      )

    default:
      return (
        <div className="mb-1">
          <label className="true-gray-900 text-lg" htmlFor={props.name}>
            {props.label}
          </label>
          <input
            {...props.register(props.name)}
            aria-invalid={props.error}
            className={`text-true-gray-900 placeholder:text-light-gray max-h-12 w-full rounded-full py-4 px-6 text-lg font-normal ${
              props.error ? 'bg-error border-light-red border-2' : 'bg-[#ECECEC]}'
            }`}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
          />
        </div>
      )
  }
}

export default Input
