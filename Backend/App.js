const fs=require('fs');

fs.writeFile("hello.txt","Hello hii kaise ho",function(err){
    if(err) console.error(err);
    else console.log(("Done"));
    
})//create file 


fs.appendFile("hello.txt","Mai Achha hu",function(err){
    if(err) console.error(err);
    else console.log(("Done"));
    
})//Append  file 

fs.rename("hello.txt","hey.txt",function(err){
      if(err) console.error(err);
    else console.log(("Done"));
})//rename file


fs.copyFile("hey.txt","./copy/copy.txt",function(err){
     if(err) console.error(err);
    else console.log(("Done"));
})//copy file


fs.unlinkFile("hey.txt",function(err){
     if(err) console.error(err);
    else console.log(("Done"));
})//delete file