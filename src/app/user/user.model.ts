export class User {
  constructor(public username: string, public password: string,
    public name: string, public surename: string, public documentType: string,
    public documentNumber: string, public roles: [string], public lastEvent: {token: string},
    public imageId: string, public instituteId: string) {}
}
