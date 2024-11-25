export const validatorLogin = (el: string): boolean => {
  return /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/.test(el);
};

export const validatorPassword = (el: string): boolean => {
  return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(el);
};

export const validatorFirstName = (el: string): boolean => {
  return /^[A-ZА-ЯЁ][a-zа-яё-]*$/.test(el);
};

export const validatorSecondName = (el: string): boolean => {
  return /^[A-ZА-ЯЁ][a-zа-яё-]*$/.test(el);
};

export const validatorEmail = (el: string): boolean => {
  return /^[A-Za-z\d\-_]+@[A-Za-z\d\-_]+\.[A-Za-z]+$/.test(el);
};

export const validatorPhone = (el: string): boolean => {
  return /^\+?\d{10,15}$/.test(el);
};

export const validatorMessage = (el: string): boolean => {
  return el.length > 0;
};
