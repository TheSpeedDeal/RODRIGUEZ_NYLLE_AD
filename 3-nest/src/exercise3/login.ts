export class login {

    private user:string;
    private pass:string; 

    constructor(model:string, color:string){
        this.user = model;
        this.pass = color;  
    }

    log(){
        console.log(`${this.user}:      ${this.pass}`);
    }

    toJson(){
        return {
            user:this.user,
            pass:this.pass,
        };
    }

}

