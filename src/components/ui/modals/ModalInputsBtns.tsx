import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Input from '../Input'
import Button from '../Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  inputs: { id: string; label: string; placeholder: string; name: string; type: string }[]
  buttons: { background: string; textColor: string; children: string; onClick: () => void }[]
  title: string
  close: string
}

const ModalInputsBtns = ({ ...props }: ModalProps) => {
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const {
    register,
    formState: { errors }
  } = useForm()

  const ModalInputsBtns = ({ open, onClose }: ModalProps) => {
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

  const mainElement = document.querySelector('main')

  if (mainElement) {
    mainElement.addEventListener('click', (e) => {
      if (
        props.open &&
        dialogRef.current &&
        e.target instanceof Node &&
        !dialogRef.current.contains(e.target as Node)
      ) {
        handleClose()
      }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onClose()
  }

  return props.open ? (
    <dialog
      ref={dialogRef}
      className="inset-0 flex items-center justify-center bg-transparent"
      role="dialog"
    >
      <div className="fixed top-0 left-0 z-10 h-screen w-screen backdrop-blur backdrop-opacity-40" />
      <div
        ref={dialogContentRef}
        className="relative z-20 flex max-w-full flex-col gap-6 rounded-3xl bg-[#848484]/50 px-10 py-4 backdrop-blur backdrop-opacity-80 sm:py-10 sm:px-16 md:px-9 md:py-14 lg:py-9 lg:px-14"
      >
        <div className="flex justify-center">
          <span className="text-xl text-white sm:text-2xl">{props.title}</span>
          {props.close === '' ? (
            <button
              autoFocus
              className="absolute top-2 right-2 p-2 focus:outline-none focus-visible:outline-white"
              onClick={handleClose}
            >
              <img alt="Close modal" src="src/assets/images/cross.svg" />
            </button>
          ) : null}
        </div>
        <form onSubmit={handleSubmit}>
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

export default ModalInputsBtns
