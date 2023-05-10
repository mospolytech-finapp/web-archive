export default interface ITransactionData {
  id: number
  name?: string
  amount: number
  date: Date
  time?: string
  description?: string
  category: number
}
