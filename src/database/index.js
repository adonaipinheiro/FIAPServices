class Database {
  #users;

  constructor() {
    this.#users = [
      {
        name: 'Adonai',
        products: ['adonai'],
      },
    ];
  }

  getUsers() {
    return this.#users;
  }

  getUserProducts() {
    return this.#users[0].products;
  }

  addUser(name) {
    this.#users.push({
      name: `${name}${Math.floor(Math.random() * 10)}`,
      products: [],
    });
  }
}

module.exports = new Database();
