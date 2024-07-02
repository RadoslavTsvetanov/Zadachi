export class Cookie {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  getCookie() {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(this.name + "="));

    if (cookie) {
      return cookie.split("=")[1];
    }

    return null;
  }

  setCookie(value: string, days = 7) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookie = `${this.name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookie;
  }
}

export const cookies = {
  auth: new Cookie("auth"),
};
