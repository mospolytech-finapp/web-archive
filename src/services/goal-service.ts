import IGoalData from 'types/goal'
import IGoalTransactionData from 'types/goal_transaction'

import http from '../services/http-common'

class GoalDataService {
  async getAll() {
    return await http.get<Array<IGoalData>>('/finance/goals')
  }

  async get(id: number) {
    return await http.get<IGoalData>(`/finance/goals/${id}`)
  }

  async create(data: IGoalData) {
    return await http.post<IGoalData>('/finance/goals/', data)
  }

  async update(data: IGoalData) {
    return await http.put<IGoalData>(`/finance/goals/${data.id}`, data)
  }

  async delete(id: number) {
    return await http.delete(`/finance/goals/${id}`)
  }

  async getAllTransactions(goalId: number) {
    return await http.get<Array<IGoalTransactionData>>(`/finance/goals/${goalId}/transactions/`)
  }

  async createTransaction(goalId: number, data: IGoalTransactionData) {
    return await http.post<IGoalTransactionData>(`/finance/goals/${goalId}/transactions`, data)
  }

  async getTransaction(goalId: number, id: number) {
    return await http.get<IGoalTransactionData>(`/finance/goals/${goalId}/transactions/${id}`)
  }
}

export default new GoalDataService()
