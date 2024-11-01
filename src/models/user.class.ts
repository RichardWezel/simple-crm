export class User {
    public id?: string; 
    public firstName: string;
    public lastName: string;
    public email: string;
    public birthDate: number;
    public street: string;
    public zipCode: number;
    public city: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : undefined;
        this.firstName = obj ? obj.firstName : '';
        this.lastName= obj ? obj.lastName: '';
        this.email= obj ? obj.email: '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
        }
    }
}
