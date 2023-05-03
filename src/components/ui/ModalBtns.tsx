import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import InputWithLabel from './InputWithLabel'
import ButtonCustom from './ButtonCustom'

interface ModalProps {
  open: boolean
  onClose: () => void
  direction: string
  buttons: { background: string; textColor: string; children: string; onClick: () => void }[]
  title: string
}

const ModalContact = ({ ...props }: ModalProps) => {
  const dialogRef = useRef(null)
  const dialogContentRef = useRef(null)

  const {
    register,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (dialogRef.current) {
      if (props.open) {
        dialogRef.current.showModal()
      } else {
        dialogRef.current.close()
      }
    }
  }, [props.open])

  function handleClose() {
    if (dialogRef.current) {
      dialogRef.current.close()
    }

    props.onClose()
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  })

  document.querySelector('main')?.addEventListener('click', (e) => {
    if (props.open && !dialogContentRef.current.contains(e.target)) {
      handleClose()
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onClose()
  }

  return (
    props.open && (
      <dialog
        ref={dialogRef}
        className="inset-0 flex items-center justify-center bg-transparent"
        role="dialog"
      >
        <div className="fixed top-0 left-0 z-10 h-screen w-screen backdrop-blur backdrop-opacity-40" />
        <div
          ref={dialogContentRef}
          className="relative z-20 flex flex-col gap-6 rounded-3xl bg-[#848484] bg-opacity-50 px-10 py-4 backdrop-blur backdrop-opacity-80 sm:py-10 sm:px-16 md:px-9 md:py-14 lg:py-9 lg:px-14"
        >
          <div className="flex justify-center">
            <span className="text-xl text-white sm:text-2xl">{props.title}</span>
            <button
              autoFocus
              className="absolute top-2 right-2 p-2 focus:border-2"
              onClick={handleClose}
            >
              <img alt="Close modal" src="src/assets/images/cross.svg" />
            </button>
          </div>
          <form className={`flex ${props.direction} justify-center`} onSubmit={handleSubmit}>
            {props.buttons.map((button, index) => (
              <ButtonCustom
                key={index}
                background={button.background}
                textColor={button.textColor}
                onClick={button.onClick}
              >
                {button.children}
              </ButtonCustom>
            ))}
          </form>
        </div>
      </dialog>
    )
  )
}

export default ModalContact
