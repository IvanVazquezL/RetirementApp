function generateKey(startChar) {
    const randomNumbers = [];
    for (let i = 0; i < 5; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10));
    }
    const key = startChar.toUpperCase() + randomNumbers.join('');
    return key;
}

module.exports = {
    generateKey,
}