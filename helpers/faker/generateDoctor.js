const { faker } = require('@faker-js/faker');

function generateRandomDoctor() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const phoneNumber = faker.phone.number('501-###-###');
    const specialization = faker.helpers.arrayElement([
        'Cardiology',
        'Endocrinology',
        'Gastroenterology',
        'Neurology',
        'Oncology',
        'Psychiatry',
        'Pulmonology',
        'Urology'
      ])

  return {
    firstName,
    lastName,
    email,
    phoneNumber,
    specialization
  };
}

console.log(JSON.stringify(generateRandomDoctor(),null, 2))

