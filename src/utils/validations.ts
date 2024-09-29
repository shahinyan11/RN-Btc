export const emailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const phoneValid = (phone: string): boolean => {
  return Boolean(phone) && phone.length > 8;
};

export const codeValid = (code: string): boolean => {
  return code.length === 6;
};

export const filterObject = (data: object) => {
  let tempObject = {};

  for (let key in data) {
    if (data[key]) {
      tempObject = {
        ...tempObject,
        [key]: data[key],
      };
    }
  }

  return tempObject;
};

export const validateUsername = (username: string) => {
  if (username[0] === '@') {
    return { username: username.slice(1, username.length) };
  }
  return { username };
};

export const passwordsEquals = (password: string, secondPassword: string) =>
  password === secondPassword && password.length >= 8;

export const transactionValidation = (
  amount: number,
  currentWalletBTC: number,
  commission: number,
) => {
  return (
    amount > 0 && amount + commission <= currentWalletBTC && amount >= 0.0001
  );
};

export const getCommission = ({
  amount,
  commissionServer,
  typeOfCommission,
}: {
  amount: string | number;
  commissionServer: string | number;
  typeOfCommission: 'percent' | 'btca';
}) => {
  if (typeOfCommission === 'percent') {
    return (+amount * (+commissionServer / 100)).toFixed(8);
  } else {
    return +commissionServer;
  }
};
