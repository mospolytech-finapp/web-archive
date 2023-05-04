import IGoalData from 'types/goal'

import http from '../services/http-common'

class GoalDataService {
  async getAll() {
    return await http.get<Array<IGoalData>>('/finance/goals')
  }

  async get(id: string) {
    return await http.get<IGoalData>(`/finance/goals/${id}`)
  }

  async create(data: IGoalData) {
    return await http.post<IGoalData>('/finance/goals/', data)
  }

  async update(data: IGoalData, id: string) {
    return await http.put<IGoalData>(`/finance/goals/${id}`, data)
  }

  async delete(id: string) {
    return await http.delete(`/finance/goals/${id}`)
  }
}

export default new GoalDataService()
