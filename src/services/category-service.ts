import ICategoryData from 'types/category'

import http from '../services/http-common'

class CategoryDataService {
  async getAll() {
    return await http.get<Array<ICategoryData>>('/finance/categories/')
  }

  async create(name: string) {
    return await http.post<Array<ICategoryData>>('/finance/categories/', name)
  }

  async get(id: number) {
    return await http.get<ICategoryData>(`/finance/categories/${id}/`)
  }

  async update(id: number, data: ICategoryData) {
    return await http.put<ICategoryData>(`/finance/categories/${id}/`, data)
  }

  async delete(id: number) {
    return await http.delete(`/finance/categories/${id}/`)
  }
}

export default new CategoryDataService()
