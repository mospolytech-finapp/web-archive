import ITransactionData from 'types/transaction'

import http from '../services/http-common'

class TransactionDataService {
  async getAll() {
    return await http.get<Array<ITransactionData>>('/finance/transactions/')
  }

  async create(data: ITransactionData) {
    return await http.post<ITransactionData>('/finance/transactions/', data)
  }

  async get(id: number) {
    return await http.get<ITransactionData>(`/finance/transactions/${id}`)
  }

  async update(data: ITransactionData) {
    return await http.post<ITransactionData>(`/finance/transactions/${data.id}`, data)
  }

  async delete(id: number) {
    return await http.delete(`/finance/transactions/${id}`)
  }
}

export default new TransactionDataService()
