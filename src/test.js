import ProductManager from "./ProductManager.js";

const producto1 = new ProductManager();


console.log(producto1.addProduct("samsung" , "a03" , 100000 ,  "xxx" , "30" , "celulares" , true));
console.log(producto1.addProduct("iphone" , "14" , 900000  ,  "xxxx" , "10" , "celulares" , true));
console.log(producto1.addProduct("motorola" , "e22" , 50000  ,  "xxxxx" , "15" , "celulares" , true));


console.log(producto1.getProducts());
