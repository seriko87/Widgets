export const passReducer = (state, action) => {
  if (action.type === 'LOWER_CASE') {
    const pass = action.payload;

    const lowCase = /[a-z]/;
    if (lowCase.test(pass)) {
      return {
        isRight: true,
        text: 'Must be at least one lower case',
      };
    }

    return {
      isRight: false,
      text: 'Must be at least one lower case',
    };
  }
  if (action.type === 'UPPER_CASE') {
    const pass = action.payload;

    const upCase = /[A-Z]/;
    if (upCase.test(pass)) {
      return {
        isRight: true,
        text: 'Must be at leaset one upper case',
      };
    }

    return {
      isRight: false,
      text: 'Must be at leaset one upper case',
    };
  }
  if (action.type === 'ONE_NUMBER') {
    const pass = action.payload;

    const num = /\d/;
    if (num.test(pass)) {
      return {
        isRight: true,
        text: 'Must be at least one number',
      };
    }

    return {
      isRight: false,
      text: 'Must be at least one number',
    };
  }
  if (action.type === 'SPECIAL_CHAR') {
    const pass = action.payload;

    const spCase = /(_|[^\w\d\s])/;
    if (spCase.test(pass)) {
      return {
        isRight: true,
        text: 'Must be at least one special character',
      };
    }

    return {
      isRight: false,
      text: 'Must be at least one special character',
    };
  }
  if (action.type === 'CHAR_COUNT') {
    const pass = action.payload;
    const space = /\s/;
    if (pass.length > 6) {
      if (space.test(pass)) {
        return {
          isRight: false,
          text: 'Must be at least 7 characters and no whitespace',
        };
      }
      return {
        isRight: true,
        text: 'Must be at least 7 characters and no whitespace',
      };
    }

    return {
      isRight: false,
      text: 'Must be at least 7 characters and no whitespace',
    };
  }
  if (action.type === 'LWOER') {
    return {
      ...state,
      text1: 'Must be at least 7 characters and no whitespace',
    };
  }
};
