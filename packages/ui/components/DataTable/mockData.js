const getMockData = () => {
  const data = [];
  for(let i = 0; i < 50; i++) {
    data.push({
      location: getRandomString(10),
      // category: getRandomString(7),
      username: getRandomString(12, true),
      password: getRandomString(15, true, true),
    });
  }
  return data;
}

function getRandomString(l, nums, spc) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '1234567890';
  const specChars = '~!@#$%^&*()_-+=';
  let pool = letters;
  nums && (pool += numbers);
  spc && (pool += specChars);
  let s = '';
  for (let i = 0; i < l; i++) {
    s += pool.charAt(Math.floor(Math.random() * pool.length));
  }
  return s;
}

export default getMockData;