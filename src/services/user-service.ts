import IUserData from 'types/user'

import http from '../services/http-common'

class UserDataService {
  register(data: IUserData) {
    return http.post('/auth/registration/', data)
  }

  login(data: IUserData) {
    return http.post('/auth/token/', data)
  }
}

export default new UserDataService()
