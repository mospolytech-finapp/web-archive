interface Button {
  disable?: boolean
  children: string
  background: string
  textColor: string
  w: string
  margin: string
  onClick: () => void
}

const Button = ({ ...props }: Button) => {
  return (
    <button
      className={`${props.background} ${props.w} mr-4 flex-1 rounded-full py-3 px-2 text-base font-light ${props.textColor} mt-3 disabled:bg-gray-500 disabled:bg-none ${props.margin} md:text-xl`}
      disabled={props.disable}
      type="submit"
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        props.onClick()
      }}
    >
      {props.children}
    </button>
  )
}

export default Button
