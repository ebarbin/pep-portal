import { User } from '../../user/user.model';

export class Teacher {
  constructor(public id: string, public instituteId: string, public user: User,
    public documentType: string, public documentNumber: string) {}
}
