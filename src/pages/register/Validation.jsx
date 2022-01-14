export const emailValidation = (email) => {
  const mailformat = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

  return mailformat.test(email);
};

export const passValidation = (pass) => {
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{7,}$/;

  const regPass = passRegex.test(pass);
  const spacePass = /\s/.test(pass);
  return regPass && !spacePass;
};

export const passText = [
  'LOWER_CASE',
  'UPPER_CASE',
  'ONE_NUMBER',
  'SPECIAL_CHAR',
  'CHAR_COUNT',
];
