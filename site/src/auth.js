export const auth = {
    isAuthenticated: false,
    username: null,
    userid: null,
    authenticate(username, userid) {
      this.isAuthenticated = true;
      this.username = username;
      this.userid = userid;
    },
    signout(cb) {
      this.isAuthenticated = false;
      this.username = null;
      this.userid = null;
    }
  };