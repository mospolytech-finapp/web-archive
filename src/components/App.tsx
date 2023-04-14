import { Route, Routes } from 'react-router-dom'

import AuthForm from './AuthForm'
import RegisterForm from './RegisterForm'

function App() {
  return (
    <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center">
        <Routes>
          <Route element={<AuthForm />} path="/auth" />
          <Route element={<RegisterForm />} path="/register" />
        </Routes>
      </section>
    </main>
  )
}

export default App
