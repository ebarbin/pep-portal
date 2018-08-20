export class User {
  constructor(public id: string, public username: string, public password: string,
    public name: string, public surename: string, public documentType: string,
    public documentNumber: string, public role: string, public lastEvent: {token: string},
    public imageId: string, public instituteId: string) {}
}
