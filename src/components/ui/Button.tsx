interface Button {
  disable?: boolean
  children: string
}

const Button = ({ ...props }: Button) => {
  return (
    <button
      className="
      from-light-green
      to-light-blue active:shadow-custom
      focus:border-blue-focus
      w-full
      rounded-full
      bg-gradient-to-r
      py-3
      text-base
      font-light
      text-white
      focus:border-2
      focus:outline-0
      disabled:bg-gray-500
      disabled:bg-none
      md:text-xl
      "
      disabled={props.disable}
      type="submit"
    >
      {props.children}
    </button>
  )
}

export default Button
