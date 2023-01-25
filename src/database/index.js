const crypto = require('crypto');
const {
  uniqueNamesGenerator,
  names,
  animals,
} = require('unique-names-generator');

const products = [
  'Banana',
  'Maça',
  'Pera',
  'Goiaba',
  'Jabuticaba',
  'Melão',
  'Melancia',
  'Tomates',
  'Uva',
  'Limão',
  'Laranja',
];

const domainEmails = [
  'gmail.com',
  'hotmail.com',
  'yahoo.com.br',
  'outlook.com',
  'fiap.com.br',
];

const config = {
  dictionaries: [names],
};

const passConfig = {
  dictionaries: [animals],
};

class Database {
  #users;

  constructor() {
    this.#users = this.#createUsers();
  }

  getUsers() {
    return this.#users;
  }

  findUser(email) {
    return this.#users.find(user => user.email === email);
  }

  addUserProduct(email, product) {
    const index = this.#users.findIndex(user => user.email === email);
    this.#users[index].products.push(product);
  }

  removeUserProduct(email, product) {
    const userIndex = this.#users.findIndex(
      user => user.email === email,
    );
    const productIndex = this.getUserProducts(email).findIndex(
      productItem => productItem === product,
    );
    this.#users[userIndex].products.splice(productIndex, 1);
    return productIndex;
  }

  getUserProducts(email) {
    return this.#users.find(user => user.email === email).products;
  }

  addUser(name, email, pass) {
    this.#users.push({
      name,
      email,
      pass,
      products: [],
    });
  }

  #createUsers() {
    let usersList = [];
    for (let i = 0; i < 50; i++) {
      const name = uniqueNamesGenerator(config);
      usersList.push({
        name: name,
        email: `${name}.${uniqueNamesGenerator(config)}@${
          domainEmails[
            Math.floor(Math.random() * domainEmails.length)
          ]
        }`.toLocaleLowerCase(),
        pass: crypto
          .createHash('sha256')
          .update(uniqueNamesGenerator(passConfig))
          .digest('hex'),
        products: this.#getRandomProducts(),
      });
    }
    return usersList;
  }

  #getRandomProducts() {
    let auxArray = [];
    let randomProduct = Math.floor(Math.random() * products.length);
    for (let i = 0; i < randomProduct; i++) {
      auxArray.push(products[i]);
    }
    return auxArray.sort(() => Math.random() - 0.5);
  }
}

module.exports = new Database();
