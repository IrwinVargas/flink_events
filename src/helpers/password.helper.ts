import * as bcrypt from "bcryptjs";

export class PasswordHelper{
    static hashPassword(password:string) {
        return bcrypt.hashSync(password, 8);
      }
    
      static checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, password: string) {
        return bcrypt.compareSync(unencryptedPassword, password);
      }
}