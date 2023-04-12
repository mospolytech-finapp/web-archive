import Input from './ui/Input'
import Button from './ui/Button'

function App() {
  return (
    <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        <h1 className="text-7xl font-bold tracking-wide">
          COINSTAT
          <span className="block text-3xl italic">start of development</span>
          <form action="" method="Post">
            <Input
              name="login"
              placeholder="Введите адрес электронной почты или номер телефона"
              type="text"
            />
            <Input name="sdv" type="checkbox" />
            <label className="flex flex-col content-center items-center" htmlFor="password">
              <span>Пароль</span>
              <Input name="password" placeholder="Введите пароль" type="password" />
            </label>

            <Button>Войти</Button>
          </form>
        </h1>
      </section>
    </main>
  )
}

export default App
