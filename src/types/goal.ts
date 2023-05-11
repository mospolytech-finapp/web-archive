export default interface IGoalData {
  id: number
  name: string
  opening_date?: string
  achievement_date: string
  amount_target: number
  amount_now?: number
}
