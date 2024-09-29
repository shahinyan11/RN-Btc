export const cleanNumber = (value: string) => {
  // Remove leading zeroes except when followed by "."
  value = value.replace(/^0+(?=[0-9]|0\.)/, '');
  // Remove multiple consecutive commas or dots
  value = value.replace(/(\.{2,})/g, '.');
  // Remove non-numeric characters except for "." and ","
  value = value.replace(/[^0-9.]/g, '');
  // Return the cleaned-up value
  return value;
};
