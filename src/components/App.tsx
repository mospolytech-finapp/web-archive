import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthForm from './AuthForm'
import RegisterForm from './RegisterForm'
import Goals from './Goals'
import TestHeader from './TestHeader'
import Transactions from './Transactions'
import GoalDonutChart from './ui/GoalDonutChart'
import GoalProgressBar from './ui/GoalProgressBar'
import Header from './ui/Header'
import Home from './Home'
import Error404 from './ui/Error404'

function App() {
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
          <Header />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AuthForm />} path="/auth" />
            <Route element={<RegisterForm />} path="/register" />
            <Route element={<Goals />} path="/goals" />
            <Route element={<TestHeader />} path="/header" />
            <Route element={<Transactions />} path="/transactions" />
            <Route element={<GoalDonutChart percent={100} />} path="/donut" />
            <Route element={<Error404 />} path="*" />
            <Route
              element={
                <div className="w-96">
                  <GoalProgressBar progress={90} progressText="345 050" />
                </div>
              }
              path="/progress"
            />
          </Routes>
        </section>
      </main>
    </>
  )
}

export default App
