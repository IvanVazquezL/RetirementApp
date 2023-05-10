const { faker } = require('@faker-js/faker');

function generateRandomPatient() {
    const gender = faker.helpers.arrayElement(['male', 'female']);
    const firstName = faker.name.firstName(gender === 'male' ? 'male' : 'female');
    const lastName = faker.name.lastName();
    const dateOfBirth = faker.date.between('1940-01-01', '1950-12-31');
    const medicalHistory = faker.lorem.lines(1);
    const allergies = [faker.helpers.arrayElement(['Peanuts', 'Lactose', 'Pollen', 'Penicillin', 'Shellfish'])];
    const medications = [faker.helpers.arrayElement([
        'Aspirin',
        'Ibuprofen',
        'Acetaminophen',
        'Amoxicillin',
        'Lisinopril'
      ])];
    const roomNumber = Math.floor(Math.random() * 100) + 1;
    const status = 'Active';

  return {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    medicalHistory,
    allergies,
    medications,
    roomNumber,
    status,
  };
}

console.log(JSON.stringify(generateRandomPatient(),null, 2))


