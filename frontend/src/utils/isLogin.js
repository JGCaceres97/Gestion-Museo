function IsLogin() {
  const Token = JSON.parse(window.localStorage.getItem('Token'));

  if (Token) {
    return true;
  } else {
    return false;
  }
}

export default IsLogin;
