class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  get() {
    return this.url;
  }
}

export const api = new Api("jiji");
