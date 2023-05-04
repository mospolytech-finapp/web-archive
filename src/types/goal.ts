export default interface IGoalData {
  id: number
  name: string
  opening_date?: Date
  achievement_date: Date
  amount_target: number
  amount_now: number
}
