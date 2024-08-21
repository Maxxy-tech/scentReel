export const getAuth = () => {
  const auth = localStorage.getItem("user");
  return auth ? JSON.parse(auth) : null;
};

export const setAuth = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};
