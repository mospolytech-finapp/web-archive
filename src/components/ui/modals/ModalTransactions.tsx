import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Input from '../Input'
import Button from '../Button'
import Select from '../Select'

interface ModalProps {
  open: boolean
  onClose: () => void
  select: {
    id: string
    label: string
    placeholder: string
    name: string
    options: Array<{ value: string; label: string }>
  }[]
  inputs: { id: string; label: string; placeholder: string; name: string; type: string }[]
  buttons: { background: string; textColor: string; children: string; onClick: () => void }[]
  title: string
  close: string
}

const ModalTransactions = ({ ...props }: ModalProps) => {
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const {
    register,
    formState: { errors }
  } = useForm()

  const ModalClose = ({ open, onClose }: ModalProps) => {
    // ...
    useEffect(() => {
      function Close() {
        if (dialogRef.current) {
          dialogRef.current.close()
        }
        onClose()
      }
      if (dialogRef.current) {
        if (open) {
          dialogRef.current.showModal()
        } else {
          dialogRef.current.close()
        }
        dialogRef.current?.addEventListener('click', (e) => {
          if (e.target instanceof Node && !dialogRef.current?.contains(e.target)) {
            Close()
          }
        })
      }
    }, [open, onClose])
  }

  function handleClose() {
    if (dialogRef.current) {
      dialogRef.current.close()
    }

    props.onClose()
  }

  function onClick() {
    // здесь действие при нажатии на кнопку
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onClose()
  }

  return props.open ? (
    <dialog
      ref={dialogRef}
      className="inset-0 mt-12 flex items-center justify-center bg-transparent"
      role="dialog"
    >
      <div className="fixed top-0 left-0 z-10 h-screen w-screen backdrop-blur backdrop-opacity-100" />
      <div
        ref={dialogContentRef}
        className="relative z-20 flex max-w-full flex-col gap-6 rounded-3xl bg-[#e5e5e5]/50 px-6 py-4 shadow-[0_0_40px_4px_rgba(0,0,0,0.25)] backdrop-blur backdrop-opacity-80 sm:py-10 sm:px-16 md:px-9 md:py-14 lg:py-9 lg:px-14"
      >
        <div className="flex justify-center">
          <span className="text-xl text-black sm:text-2xl">{props.title}</span>
          {props.close === '' ? (
            <button
              autoFocus
              className="absolute top-2 right-2 p-2 focus:outline-none focus-visible:outline-white"
              onClick={handleClose}
            >
              <img alt="Close modal" className="w-4" src="src/assets/images/black_cross.svg" />
            </button>
          ) : null}
        </div>
        <form onSubmit={handleSubmit}>
          {props.select.map((select, index) => (
            <Select
              key={index}
              error={false}
              id={select.id}
              label={select.label}
              name={select.name}
              options={select.options}
              placeholder={select.placeholder}
              register={register}
            />
          ))}
          {props.inputs.map((input, index) => (
            <Input
              key={index}
              error={false}
              id={input.id}
              label={input.label}
              name={input.name}
              placeholder={input.placeholder}
              register={register}
              type={input.type}
            />
          ))}
          <div className="flex flex-col md:flex-row md:justify-between md:gap-10">
            <div className="mb-2 flex w-32 flex-col">
              <label className="true-gray-900 sm:text-base md:text-xl" htmlFor={'name'}>
                {'Дата'}
              </label>
              <input
                className={`text-true-gray-900 placeholder:text-light-gray max-h-12 rounded-full py-4 px-6 text-base font-normal ${'bg-[#ECECEC]}'}
                `}
                id={'date'}
                name={'date'}
                placeholder={'25.04.2023'}
                type={'text'}
              />
            </div>
            <div className="mb-2 flex w-32 flex-col">
              <label className="true-gray-900 sm:text-base md:text-xl" htmlFor={'name'}>
                {'Время'}
              </label>
              <input
                className={`text-true-gray-900 placeholder:text-light-gray max-h-12 rounded-full py-4 px-6 text-base font-normal ${'bg-[#ECECEC]}'}
                `}
                id={'date'}
                name={'date'}
                placeholder={'14:39'}
                type={'text'}
              />
            </div>
            <div className="mb-2 flex w-32 flex-col">
              <label className="true-gray-900 sm:text-base md:text-xl" htmlFor={'name'}>
                {'Сумма'}
              </label>
              <input
                className={`text-true-gray-900 placeholder:text-light-gray max-h-12 rounded-full py-4 px-6 text-base font-normal ${'bg-[#ECECEC]}'}
                `}
                id={'date'}
                name={'date'}
                placeholder={'1213'}
                type={'text'}
              />
            </div>
          </div>
          <div className="mb-2 flex flex-col">
            <label className="true-gray-900 sm:text-base md:text-xl" htmlFor={'name'}>
              {'Описание'}
            </label>
            <textarea
              className={`text-true-gray-900 placeholder:text-light-gray resize-none rounded-3xl py-4 px-6 text-base font-normal ${'bg-[#ECECEC]}'}
              `}
              id={'date'}
              name={'date'}
              placeholder={'1213'}
            />
          </div>
          <div className="flex flex-row justify-center">
            {props.buttons.map((button, index) => (
              <Button
                key={index}
                background={button.background}
                textColor={button.textColor}
                onClick={() => {
                  if (props.close === button.children) {
                    handleClose()
                  } else {
                    onClick()
                  }
                  button.onClick()
                }}
              >
                {button.children}
              </Button>
            ))}
          </div>
        </form>
      </div>
    </dialog>
  ) : null
}

export default ModalTransactions
