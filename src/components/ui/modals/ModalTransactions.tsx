import React, { useEffect, useRef } from 'react'
import { useForm, FieldValues, UseFormRegister } from 'react-hook-form'
import ITransactionData from 'types/transaction'

import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import crossIcon from '../../../assets/images/black_cross.svg'

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
  filter: boolean
  register: UseFormRegister<FieldValues>
  transaction?: ITransactionData
}

const ModalTransactions = ({ ...props }: ModalProps) => {
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

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
              <img alt="Close modal" className="w-4" src={crossIcon} />
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
              register={props.register}
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
              register={props.register}
              type={input.type}
            />
          ))}
          {props.filter === false ? (
            <>
              <div className="flex flex-col md:flex-row md:justify-between md:gap-10">
                <div className="mb-2 flex flex-col md:w-32">
                  <Input
                    error={false}
                    id="date"
                    label="Дата"
                    name="date"
                    register={props.register}
                    type="date"
                  />
                </div>
                <div className="mb-2 flex flex-col md:w-32">
                  <Input
                    error={false}
                    id="time"
                    label="Время"
                    name="time"
                    register={props.register}
                    type="time"
                  />
                </div>
                <div className="mb-2 flex flex-col md:w-32">
                  <Input
                    error={false}
                    id="amount"
                    label="Сумма"
                    name="amount"
                    placeholder={'1213'}
                    register={props.register}
                    type="number"
                  />
                </div>
              </div>
              <div className="mb-2 flex flex-col">
                <Input
                  error={false}
                  id="description"
                  label="Описание"
                  name="description"
                  placeholder={'1213'}
                  register={props.register}
                  type="text"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row justify-around">
                <div className="mb-2 flex w-24 flex-col sm:w-32">
                  <Input
                    error={false}
                    id="amount_min"
                    label="От:"
                    name="amount_min"
                    placeholder={'100 руб'}
                    register={props.register}
                    type="number"
                  />
                </div>
                <div className="mb-2 flex w-24 flex-col sm:w-32">
                  <Input
                    error={false}
                    id="amount_max"
                    label="До:"
                    name="amount_max"
                    placeholder={'5000 руб'}
                    register={props.register}
                    type="number"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-around">
                <div className="mb-2 flex w-24 flex-col sm:w-32">
                  <Input
                    error={false}
                    id="date"
                    label="Дата"
                    name="date"
                    register={props.register}
                    type="date"
                  />
                </div>
                <div className="mb-2 flex w-24 flex-col sm:w-32">
                  <Input
                    error={false}
                    id="time"
                    label="Время"
                    name="time"
                    register={props.register}
                    type="time"
                  />
                </div>
              </div>
            </>
          )}
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
