import { useEffect, useRef } from 'react'

import crossIcon from '../../../assets/images/cross.svg'
import copyIcon from '../../../assets/images/copy_icon.svg'

interface ModalContact {
  open: boolean
  onClose: () => void
}

const ModalContact = ({ ...props }: ModalContact) => {
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

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
    if (
      props.open &&
      dialogContentRef.current &&
      !dialogContentRef.current.contains(e.target as Node)
    ) {
      handleClose()
    }
  })

  return props.open ? (
    <dialog
      ref={dialogRef}
      className="inset-0 flex items-center justify-center bg-transparent"
      role="dialog"
    >
      <div className="fixed top-0 left-0 z-10 h-screen w-screen backdrop-blur backdrop-opacity-40" />
      <div
        ref={dialogContentRef}
        className="z-20 flex flex-col gap-6 rounded-3xl bg-[#2A2A2A]/50 px-5 py-4 backdrop-blur backdrop-opacity-80 sm:py-10 sm:px-16 md:px-9 md:py-14 lg:py-9 lg:px-14"
      >
        <div className="gap-15 flex justify-between sm:gap-28">
          <span className="bg-gradient-to-r from-[#C3FFED] to-[#AED8FF] bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            Связаться с нами
          </span>
          <button autoFocus focus-visible className="p-2" onClick={handleClose}>
            <img alt="Close modal" src={crossIcon} />
          </button>
        </div>
        <div className="flex flex-col justify-between gap-1">
          <span className="bg-gradient-to-r from-[#C3FFED] to-[#AED8FF] bg-clip-text text-xl font-bold text-transparent">
            Почта
          </span>
          <div className="flex gap-7 sm:gap-8">
            <a
              className="text-base font-normal text-white underline"
              href="mailto:HelpMe@FINAPP.COM"
            >
              HelpMe@FINAPP.COM
            </a>
            <button
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                navigator.clipboard.writeText('HelpMe@FINAPP.COM')
              }}
            >
              <img src={copyIcon} />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-1">
          <span className="bg-gradient-to-r from-[#C3FFED] to-[#AED8FF] bg-clip-text text-xl font-bold text-transparent">
            Телефон
          </span>
          <div className="flex gap-7 sm:gap-8">
            <a className="text-base font-normal text-white underline" href="tel:89996663132">
              89996663132
            </a>
            <button
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                navigator.clipboard.writeText('89996663132')
              }}
            >
              <img src={copyIcon} />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  ) : null
}

export default ModalContact
