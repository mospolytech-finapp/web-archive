import { Route, Routes } from 'react-router-dom'

import AuthForm from './AuthForm'
import RegisterForm from './RegisterForm'
import TestSettings from './TestSettings'

function App() {
  return (
    <main className="grid min-h-screen place-content-center bg-[url('./src/assets/images/login_background.svg')] from-blue-700 to-blue-800 bg-cover">
      <section>
        <Routes>
          <Route element={<AuthForm />} path="/auth" />
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<TestSettings />} path="/settings" />
        </Routes>
      </section>
    </main>
  )
}

export default App
