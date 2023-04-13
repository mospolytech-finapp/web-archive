import { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  name: string
  type: string
  register: UseFormRegister<FieldValues>
  placeholder?: string
}

const Input = ({ ...props }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState)
  }

  return (
    <>
      {(() => {
        switch (props.type) {
          case 'password':
            return (
              <div className="flex w-full content-center items-center">
                <input
                  {...props.register(props.name)}
                  className="text-light-gray placeholder:text-light-gray  -mr-10 max-h-12 w-full rounded-full py-4 px-6 pr-12 text-xl font-normal"
                  id={props.id}
                  name={props.name}
                  placeholder={props.placeholder}
                  type={isPasswordVisible ? 'text' : 'password'}
                />
                <img
                  alt={isPasswordVisible ? 'скрыть пароль' : 'показать пароль'}
                  src={
                    isPasswordVisible
                      ? 'src/assets/images/close_eye.svg'
                      : 'src/assets/images/open_eye.svg'
                  }
                  onClick={togglePasswordVisibility}
                />
              </div>
            )

          case 'checkbox':
            return (
              <input
                {...props.register(props.name)}
                className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border
                   {/*checked:absolute*/}
                  {/*checked:left-0*/}
                  {/*checked:top-0*/}
                  {/*checked:h-full*/}
                  {/*checked:w-full*/}
                  checked:bg-[url('./src/assets/images/check_mark.svg')]
                  checked:bg-[length:15px]
                  checked:bg-center
                  checked:bg-no-repeat
                  checked:content-['']
                  checked:bg-[#ECECEC]
                  hover:ring
                  hover:ring-gray-300
                  focus:outline-none"
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
                className="text-light-gray placeholder:text-light-gray max-h-12 w-full rounded-full py-4 px-6  text-xl font-normal"
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                type={props.type}
              />
            )
        }
      })()}
    </>
  )
}

export default Input
