//Fundamental of js
//arrays and object
//function return
//async js
//for each map filter find index of


console.log("Shivam");
//alert("Shivam");


let arr=[1,2,3,4];

// arr.forEach(function(val){
//       console.log(val + " hello");
      
// })

// let newArr=arr.map(function(val){
//      return 13;
// })
// console.log(newArr);



// let filter=arr.filter(function(val){
//     if(val>3){return true}
// })
// console.log(filter);


// let find=arr.find(function(val){
//     if(val===2) return val;
// })

// console.log(find);


// let index=arr.findIndex(function(val){
//     return val===2;
// })

// console.log(index);


let obj={
    name:"shivam",
    age:22,

}
//obj.name()
Object.freeze(obj);


// function abc(a,b,c){

// }abc.length=3//parameter is length of function

function ans(){
    return 12;
}

ans();


//  var blob=await fetch(`https://randomuser.me/api/`);
//  var res=await blob.json();
//  console.log(res);//its not due to any cause

 async function abc(){
    var blob=await fetch(`https://randomuser.me/api/`);
     var ans= await blob.json();

     console.log(ans.results);
     
}
abc();


 