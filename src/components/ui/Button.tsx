interface Button {
  disable?: boolean
  children: string
}

const Button = ({ ...props }: Button) => {
  return (
    <button
      className="from-light-green to-light-blue max-h-12 w-full rounded-full bg-gradient-to-r py-3 text-base font-light text-white md:text-xl"
      disabled={props.disable}
      type="submit"
    >
      {props.children}
    </button>
  )
}

export default Button
