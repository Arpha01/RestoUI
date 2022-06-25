export class Admin {
    constructor(data?:any) {
        if(data) {
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.password = data.password;
        }
    }

    id: number;
    name: string;
    email: string;
    password: string;
}