const checkForValidEmail = (email: string) => {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  if (email.match(emailRegex)) return true;
  return false;
};

export { checkForValidEmail };
