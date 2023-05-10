import { useState } from 'react'

import logo from '../../assets/images/logo.svg'
import exit from '../../assets/images/exit.svg'
import transactions from '../../assets/images/transactions.svg'
import profile from '../../assets/images/profile.svg'

import ModalBtns from './modals/ModalBtns'

interface Header {
  disable?: boolean
  children: string
  background: string
  textColor: string
  onClick: () => void
}

const Header = () => {
  const [isModalBtnOpen, setIsModalBtnOpen] = useState(false)

  return (
    <header className="absolute left-0 top-0 h-24 w-screen bg-[#202020] py-5">
      <div className=" m-auto flex h-14 max-w-7xl flex-row items-center justify-between px-3">
        <a href="/goals">
          <img alt="логотип" className="w-16 sm:w-28 md:w-40" src={logo} />
        </a>
        <div className="flex w-56 flex-row justify-between sm:w-full sm:max-w-sm  md:max-w-md lg:max-w-lg">
          <a
            className="flex h-8 flex-row items-center justify-center rounded-full bg-[#424242] px-2 text-xs text-white sm:w-40 sm:text-base"
            href="/transactions"
          >
            <img alt="транзакции" className="mr-2" src={transactions} />
            Транзакции
          </a>
          <a
            className="flex h-8 flex-row items-center justify-center rounded-full bg-[#424242] px-2 text-xs text-white sm:w-40 sm:text-base"
            href="/profile"
          >
            <img alt="аккаунт" src={profile} />
            Аккаунт
          </a>
          <button
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              setIsModalBtnOpen(true)
            }}
          >
            <img alt="выйти" className="w-4 sm:w-6" src={exit} />
          </button>
        </div>
      </div>
      <ModalBtns
        buttons={[
          {
            background: 'bg-[#2B2828]',
            textColor: 'text-white',
            children: 'Выйти',
            onClick: () => null
          },
          {
            background: 'from-light-green to-light-blue bg-gradient-to-r active:shadow-custom',
            textColor: 'text-white',
            children: 'Остаться в приложении',
            onClick: () => null
          }
        ]}
        close="Остаться в приложении"
        direction="flex-col"
        open={isModalBtnOpen}
        title={'Вы действительно хотите выйти?'}
        onClose={() => setIsModalBtnOpen(false)}
      />
    </header>
  )
}

export default Header
