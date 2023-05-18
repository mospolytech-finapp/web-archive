export default interface ITransactionData {
  id?: number
  name: string
  amount: string
  date: string
  time?: string
  description?: string
  category: number
  [key: string]: any
}
