export function numberFormatter(num) {
  if (num < 1000000000 && num > 999999) {
    return (Math.abs(num) / 1000000).toFixed(1) + 'm';
  }
  if (num < 1000000 && num > 999) {
    return (Math.abs(num) / 1000).toFixed(1) + 'k';
  }
  if (num < 1000000000000 && num > 999999999) {
    return (Math.abs(num) / 1000000000).toFixed(1) + 'b';
  }
  if (num >= 1000000000000) {
    return (Math.abs(num) / 1000000000000).toFixed(1) + 't';
  }

  return num;
}

// formatting
export const formatPrice = (a) => {
  let num = 0;

  let str = a.toFixed(10).split('');

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '.') {
      num = i;
    }
  }
  let arr = [];
  const nnn = str.map((item, index) => {
    if (index > num) {
      if (item === '0') {
        return item;
      } else {
        arr.push(index);
      }
    } else {
      return item;
    }
  });

  return str.slice(0, arr[0] + 3).join('');
};

// fisher-yates sorting
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
