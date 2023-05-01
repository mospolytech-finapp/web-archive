import IUserData from 'types/user'

import http from '../services/http-common'

class UserDataService {
  async register(data: IUserData) {
    return await http.post('/auth/registration/', data)
  }

  async login(data: IUserData) {
    return await http.post('/auth/token/', data)
  }
}

export default new UserDataService()
