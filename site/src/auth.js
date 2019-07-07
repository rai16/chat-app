//need to store the JWT here
export const auth = {
    isAuthenticated: false,
    username: null,
    userid: null,
    token: null,
    authenticate(username, userid, token) {
      this.isAuthenticated = true;
      this.username = username;
      this.userid = userid;
      this.token = token;
    },
    signout(cb) {
      this.isAuthenticated = false;
      this.username = null;
      this.userid = null;
      this.token = null;
    }
  };