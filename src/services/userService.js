import { userDAO } from "../DAO/factory.js";

class UserService {
  constructor(dao) {
    this.dao = dao; // Asigna directamente el DAO pasado como parámetro
  }

  async createUser(user) {
    return await this.dao.create(user);
  }

  async getUserBy(filter) {
    return await this.dao.getBy(filter);
  }
}

export const userService = new UserService(userDAO);
