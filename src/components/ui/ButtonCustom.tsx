interface Button {
  disable?: boolean
  children: string
  background: string
  textColor: string
}

const Button = ({ ...props }: Button) => {
  return (
    <button
      className={`${props.background} max-h-12 w-auto rounded-full py-3 px-2 text-base font-light ${props.textColor} mx-5 mt-3 disabled:bg-gray-500 disabled:bg-none md:text-xl`}
      disabled={props.disable}
      type="submit"
    >
      {props.children}
    </button>
  )
}

export default Button
