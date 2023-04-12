interface Button {
  children: string
}

const Button = ({ ...props }: Button) => {
  return (
    <button
      className="from-light-green to-light-blue max-h-12 w-full rounded-full bg-gradient-to-r py-3 text-xl font-normal text-white"
      type="submit"
    >
      {props.children}
    </button>
  )
}

export default Button
