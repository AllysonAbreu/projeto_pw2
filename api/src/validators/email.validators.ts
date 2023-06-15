

export class EmailValidator{
    static emailIsValid(email:string){
        if(email === null || email === undefined || email === "") {
            throw new Error(`Email tem que ser válidamente preenchido.`);
        };
        return true;
    };
};