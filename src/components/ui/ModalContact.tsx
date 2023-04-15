interface ModalContact {
  open: boolean
  onClose: () => void
}

const ModalContact = ({ ...props }) => {
  return (
    props.open && (
      <dialog className="open inset-0 flex items-center justify-center bg-transparent">
        <div className="backdrop fixed top-0 left-0 z-10 h-full w-full backdrop-blur backdrop-opacity-40" />
        <div className="backdrop z-20 flex flex-col gap-6 rounded-3xl bg-[#2A2A2A] bg-opacity-50 px-10 py-4 backdrop-blur backdrop-opacity-80 sm:py-10 sm:px-16 md:px-9 md:py-14 lg:py-9 lg:px-14">
          <div className="flex justify-between gap-20 sm:gap-28">
            <span className="bg-gradient-to-r from-[#C3FFED] to-[#AED8FF] bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              Связаться с нами
            </span>
            <button onClick={() => props.onClose()}>
              <img alt="Close modal" src="src/assets/images/cross.svg" />
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
              <button onClick={() => navigator.clipboard.writeText('HelpMe@FINAPP.COM')}>
                <img src="src/assets/images/copy_icon.svg" />
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
              <button onClick={() => navigator.clipboard.writeText('89996663132')}>
                <img src="src/assets/images/copy_icon.svg" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    )
  )
}

export default ModalContact
