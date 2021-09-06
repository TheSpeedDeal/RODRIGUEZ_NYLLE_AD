var row = 5;
var col = 5;
let temp = "";
//Sir kuti lagi ni, basin naai sayon buhaton ani pero ambot lang xD
for(x = 1; x <= row; x++){
    temp = "";
    for(y = 1; y <= col; y++){
        temp += " " + (x*y);


        //if(y <= col-1) console.log(x*y);
        //else console.log(x*y,'\n');

    }
    console.log(temp);
}