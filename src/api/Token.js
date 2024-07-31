// Token.js
export const getAuth = () => {
  return JSON.parse(localStorage.getItem("auth"));
};

export const setAuth = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};
