import ProductManager from "./ProductManager.js";

const producto1 = new ProductManager();


console.log(producto1.addProduct("peugeot" , "308" , 900000 , "foto" , "xxx" , 30));
console.log(producto1.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxx" , 70));
console.log(producto1.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxxx" , 70));
console.log(producto1.addProduct("fiat" , "meriva" , 5000 , "foto" , "xxxxxx" , 70));


console.log(producto1.getProducts());

