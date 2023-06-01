import StoreModule from "../module";

class Login extends StoreModule {

  initState() {
    return {
      user: null,
      auth: false,
      error: false,
      loading: true,
    }
  }


  async login(login, password) {
    const data = { login: login, password: password }
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.setState({
          error: 'Ошибка: ' + response.status + ` (${response.statusText})`,
          loading: false,
        });
      }

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', responseData.result.token)
        this.setState({
          ...this.getState(),
          auth: true,
          user: responseData.result,
        });
        this.getUser()
        this.setState({
          error: false,
          loading: false,
        });
      }

      return responseData;
    } catch (error) {
      console.log(error)
    }
  }

  async getUser() {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await fetch('/api/v1/users/self', {
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        }
      })
      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.getState(),
          auth: true,
          user: json.result,
          loading: false
        });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  async logout() {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        }
      })
      const json = await response.json();
      if (json) {
        localStorage.removeItem('token')
        this.setState({
          ...this.getState(),
          auth: false,
          user: null,
        });
      }
    }
  }

}

export default Login;
