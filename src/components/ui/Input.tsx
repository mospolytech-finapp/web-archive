import React, { useState } from 'react'

interface Input {
  name: string
  type: string
  placeholder?: string
}

const Input = ({ ...props }: Input) => {
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
                  className="text-light-gray placeholder:text-light-gray -mr-10 max-h-12 w-full rounded-full py-4 px-6 text-xl font-normal"
                  placeholder={props.placeholder}
                  type={isPasswordVisible ? 'text' : 'password'}
                />
                {isPasswordVisible ? (
                  <img
                    alt="скрыть пароль"
                    src="src/assets/images/close_eye.svg"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <img
                    alt="показать пароль"
                    src="src/assets/images/open_eye.svg"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            )

          case 'checkbox':
            return (
              <input
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
                placeholder={props.placeholder}
                type={props.type}
              />
            )

          default:
            return (
              <input
                className="text-light-gray placeholder:text-light-gray max-h-12 w-full rounded-full py-4 px-6  text-xl font-normal"
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
