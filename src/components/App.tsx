import AuthForm from './AuthForm'
import RegisterForm from './RegisterForm'

function App() {
  return (
    <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center">
        {/* <AuthForm /> */}
        <RegisterForm />
      </section>
    </main>
  )
}

export default App
