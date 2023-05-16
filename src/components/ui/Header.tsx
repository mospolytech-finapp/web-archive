import { useState } from 'react'
import { Link } from 'react-router-dom'

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
    <header
      className="
    {/*absolute left-0 top-0*/}
    h-24
    {/*w-screen*/}
    max-w-screen
    bg-[#202020]
    py-5"
    >
      <div className=" m-auto flex h-14 max-w-7xl flex-row items-center justify-between px-3">
        <Link to="/">
          <img alt="логотип" className="w-16 sm:w-28 md:w-40" src={logo} />
        </Link>
        <div className="flex w-56 flex-row justify-between sm:w-full sm:max-w-sm  md:max-w-md lg:max-w-lg">
          <Link
            className="flex h-8 flex-row items-center justify-center rounded-full bg-[#424242] px-1.5 sm:px-2 text-xs text-white sm:w-40 sm:text-base"
            to="/transactions"
          >
            <img alt="транзакции" className="mr-2" src={transactions} />
            Транзакции
          </Link>
          <Link
            className="flex h-8 flex-row items-center justify-center rounded-full bg-[#424242] px-1.5 sm:px-2 text-xs text-white sm:w-40 sm:text-base"
            to="/profile"
          >
            <img alt="аккаунт" src={profile} />
            Аккаунт
          </Link>
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
