export class User {
  constructor(public username: string, public password,
    public name: string, public surename: string, public documentType: string,
    public documentNumber: string, public role: string, public roles: [string]) {}
}
