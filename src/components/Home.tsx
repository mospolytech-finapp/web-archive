import React from 'react'
import { Link } from 'react-router-dom'

import arrow_grow from '../assets/images/arrow-grow.svg'
import arrow_down from '../assets/images/arrow-down.svg'
import filter from '../assets/images/filter.svg'
import refresh from '../assets/images/refresh.svg'
import user from '../assets/images/user.svg'

import Button from './ui/Button'

const Home = () => {
  return (
    <div className="mx-auto max-w-2xl rounded-b-3xl bg-[#E5E5E5] px-8 pb-9 lg:max-w-6xl lg:pt-10">
      <div
        className="mb-9
    "
      >
        <div className="flex flex-col lg:flex-row lg:justify-evenly">
          <div className="mb-9 lg:mb-0">
            <div className="relative mx-auto w-32 pt-2 lg:mx-0 lg:w-52">
              <button
                className="
        bg- bg-dark
        block
        w-32
        rounded-3xl
        py-1
        px-2
        text-left
        text-xs
        text-white lg:w-52
        lg:text-lg
        "
              >
                Обновить график
                <img
                  alt=""
                  className="absolute right-[8%] top-[50%] h-2 lg:top-[40%] lg:h-4"
                  src={refresh}
                />
              </button>
            </div>
            <div className="bg-dark my-3 rounded-3xl px-2 py-3 text-xs">
              <div className="flex justify-evenly gap-3">
                <div className="lg:w-44">
                  <span className="bg-light-green mb-2 block w-full rounded-3xl py-1 px-2 text-center font-bold lg:text-lg">
                    Доходы за месяц
                  </span>
                  <div className="relative">
                    <img
                      alt=""
                      className="absolute top-1.5 left-2 z-10 lg:top-2 lg:h-6"
                      src={arrow_grow}
                    />
                    <span className="bg-light-green mb-4 block w-full rounded-2xl py-1 pl-12 font-bold lg:text-3xl">
                      16 666 р
                    </span>
                  </div>
                </div>
                <div className="lg:w-44">
                  <span className="bg-light-blue mb-2 block w-full rounded-3xl py-1 px-2 text-center font-bold text-white lg:text-lg">
                    Расходы за месяц
                  </span>
                  <div className="relative">
                    <img
                      alt=""
                      className="absolute top-1.5 left-2 z-10 lg:top-2 lg:h-6"
                      src={arrow_down}
                    />
                    <span className="bg-light-blue mb-4 block w-full rounded-2xl py-1 pl-12 font-bold text-white lg:text-3xl ">
                      16 666 р
                    </span>
                  </div>
                </div>
              </div>
              <span className="mb-2 block w-full rounded-3xl bg-white text-center text-[8px] lg:px-2 lg:text-lg">
                Ожидаемый доход на следующий месяц:{' '}
                <span className="font-bold lg:text-lg">123123</span>
              </span>
              <span className="block w-full rounded-3xl bg-white text-center text-[8px] lg:px-2 lg:text-lg">
                Ожидаемый расход на следующий месяц:{' '}
                <span className="font-bold lg:text-lg">123123</span>
              </span>
            </div>
            <div className="flex gap-3">
              <span
                className="
        from-light-green to-light-blue
        block w-full rounded-2xl
        bg-gradient-to-r py-1 px-2 text-center
        text-xs text-white  lg:text-lg"
              >
                Баланс:2348234
              </span>
              <Link
                className="
        bg- bg-dark
        block w-full rounded-2xl
        py-1
        px-2
        text-center
        text-xs text-white lg:text-lg
        "
                to="/goals"
              >
                Цели
              </Link>
            </div>
          </div>
          <div>
            <div className="flex justify-between gap-1">
              <div className="relative w-full">
                <button
                  className="
        bg- bg-dark
        block w-full rounded-3xl
        py-1
        px-2
        text-center
        text-xs text-white
        lg:text-lg
        "
                >
                  Фильтр
                </button>
                <img
                  alt=""
                  className="absolute right-[20%] top-1.5 lg:top-1.5 lg:right-[10%] lg:h-5"
                  src={filter}
                />
              </div>
              <div className="relative w-full">
                <button
                  className="
        bg- bg-dark
        block w-full rounded-3xl
        py-1
        px-2
        text-center
        text-xs text-white
        lg:text-lg
        "
                >
                  Параметры
                </button>
                <img
                  alt=""
                  className="absolute right-[10%] top-2 lg:top-2 lg:right-[5%] lg:h-4"
                  src={user}
                />
              </div>
            </div>
            <div className="mt-2">
              <div
                className="custom-scroll mb-2 flex max-h-40 flex-col
              gap-2 overflow-y-hidden rounded-xl
              border-2 border-[#898989] py-3 pr-2 lg:max-h-60
              lg:w-96 lg:pr-8"
              >
                <div
                  className="
              custom-scroll flex max-h-40
              flex-col gap-2
              overflow-y-scroll pr-2 lg:max-h-60
              "
                >
                  <div className="from-light-blue to-purple-active-link rounded-r-2xl bg-gradient-to-r pl-5 lg:text-lg">
                    <span className="text-s block w-fit font-bold text-white">
                      Премия +2332 23 23
                    </span>
                    <span className="text-s block w-fit font-bold text-white">28.01.23</span>
                  </div>
                  <div className="from-light-green to-light-blue rounded-r-2xl bg-gradient-to-r pl-5 lg:text-lg">
                    <span className="text-s block w-fit font-bold text-white">
                      Премия +2332 23 23
                    </span>
                    <span className="text-s block w-fit font-bold text-white">28.01.23</span>
                  </div>
                  <div className="from-light-green to-light-blue rounded-r-2xl bg-gradient-to-r pl-5 lg:text-lg">
                    <span className="text-s block w-fit font-bold text-white">
                      Премия +2332 23 23
                    </span>
                    <span className="text-s block w-fit font-bold text-white">28.01.23</span>
                  </div>
                  <div className="from-light-green to-light-blue rounded-r-2xl bg-gradient-to-r pl-5 lg:text-lg">
                    <span className="text-s block w-fit font-bold text-white">
                      Премия +2332 23 23
                    </span>
                    <span className="text-s block w-fit font-bold text-white">28.01.23</span>
                  </div>
                  <div className="from-light-green to-light-blue rounded-r-2xl bg-gradient-to-r pl-5 lg:text-lg">
                    <span className="text-s block w-fit font-bold text-white">
                      Премия +2332 23 23
                    </span>
                    <span className="text-s block w-fit font-bold text-white">28.01.23</span>
                  </div>
                  <div className="from-light-green to-light-blue rounded-r-2xl bg-gradient-to-r pl-5 lg:text-lg">
                    <span className="text-s block w-fit font-bold text-white">
                      Премия +2332 23 23
                    </span>
                    <span className="text-s block w-fit font-bold text-white">28.01.23</span>
                  </div>
                  <div className="from-light-green to-light-blue rounded-r-2xl bg-gradient-to-r pl-5 lg:text-lg">
                    <span className="text-s block w-fit font-bold text-white">
                      Премия +2332 23 23
                    </span>
                    <span className="text-s block w-fit font-bold text-white">28.01.23</span>
                  </div>
                </div>
              </div>
              <button className="mx-auto block w-fit rounded-2xl border-2 border-black px-2 text-center font-bold lg:px-10 lg:py-2">
                Все транзакции
              </button>
              <div className="mx-auto grid">
                <Button
                  background="justify-self-center bg-gradient-to-r from-light-blue to-purple-active-link"
                  textColor="text-white"
                  onClick={() => null}
                >
                  Добавить новую транзакцию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
