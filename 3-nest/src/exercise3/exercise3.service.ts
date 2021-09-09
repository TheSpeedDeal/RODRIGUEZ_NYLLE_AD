import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
    loopsTriangle(height: number){
        var item = "#";

        for(let x =0; x<height; x++){
            console.log(item);
            item = item + "#";
        }
    }

    Prime(height: number){
        if(height%2 == 0) return height + '  Is a prime Number';
        if(height%3 == 0) return height + '  Is a prime Number';
        else return height + '  Is not a Prime Number';

    }

    Hello(name: string){
        return 'Hello ' + name + ' Welcome to yes';

    }
    




    return;
}


