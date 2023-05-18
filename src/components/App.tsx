import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import AuthForm from './AuthForm'
import RegisterForm from './RegisterForm'
import Goal from './Goal'
import Transactions from './Transactions'
// import GoalDonutChart from './ui/GoalDonutChart'
// import GoalProgressBar from './ui/GoalProgressBar'
import Header from './ui/Header'
import Home from './Home'
import Error404 from './ui/Error404'
import Profile from './ui/modals/Profile'

function App() {
  const location = useLocation()
  const isAuthRoute = location.pathname === '/auth'
  const isRegisterRoute = location.pathname === '/register'
  const isToken =
    localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined'
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') == 'undefined') {
      localStorage.removeItem('token')
      navigate('/auth')
    }
  }, [])

  return (
    <>
      <main
        className="
    {/*grid*/}
    min-h-screen
    place-content-center
    bg-[url('assets/images/login_background.svg')] from-blue-700 to-blue-800 bg-cover"
      >
        <section>
          {!isAuthRoute && !isRegisterRoute && <Header />}
          <Routes>
            {isToken ? (
              <>
                {/* <Route element={<Home />} path="/" /> */}
                <Route element={<Profile />} path="/profile" />
                <Route
                  element={
                    <Goal
                      achievement_date="2023-08-30"
                      amount_now="4420"
                      amount_target="20000"
                      id={1}
                      name="Холодильник"
                      opening_date="2023-05-15"
                    />
                  }
                  path="/goals"
                />
                <Route element={<Transactions />} path="/transactions" />
              </>
            ) : (
              <>
                <Route element={<AuthForm />} path="/auth" />
                <Route element={<RegisterForm />} path="/register" />
              </>
            )}
            {/* <Route element={<GoalDonutChart percent={100} />} path="/donut" /> */}
            {/* <Route element={<Error404 />} path="*" /> */}
            {/* <Route
              element={
                <div className="w-96">
                  <GoalProgressBar progress={90} progressText="345 050" />
                </div>
              }
              path="/progress"
            /> */}
          </Routes>
        </section>
      </main>
    </>
  )
}

export default App
