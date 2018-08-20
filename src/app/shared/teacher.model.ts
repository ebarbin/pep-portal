import { User } from '../user/user.model';

export class Teacher {
  constructor(public id: string, public intituteId: string, public user: User,
    public documentType: string, public documentNumber: string) {}
}
