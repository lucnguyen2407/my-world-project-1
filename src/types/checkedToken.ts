export const checkToken = (): string => {
  const token = localStorage.getItem("access_token");
  // console.log("token", token);
  return token ? token : "";
};
