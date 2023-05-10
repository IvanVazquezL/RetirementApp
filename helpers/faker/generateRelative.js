const { faker } = require('@faker-js/faker');

function generateRandomPatient() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const phoneNumber = faker.phone.number('501-###-###');

  return {
    firstName,
    lastName,
    email,
    phoneNumber
  };
}

console.log(JSON.stringify(generateRandomPatient(),null, 2))

