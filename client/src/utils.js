const TokenKey = 'K-Access-Token';

export function getToken() {
  return localStorage.getItem(TokenKey);
}
export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}