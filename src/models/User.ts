class User {
  private ip: string;

  constructor() {
    this.ip = 'Error al obtener la IP';
    this.updateIp();
  }

  getIp() {
    return this.ip;
  }

  updateIp() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => (this.ip = data.ip))
      .catch((error) => console.error(error));
  }
}

export default User;
