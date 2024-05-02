const socket = io();

socket.on('productos' , productos =>{
    const tbody = document.getElementById("productos-body")
    tbody.innerHTML = ""

    productos.forEach(producto => {
        const row = tbody.insertRow();


        row.innerHTML= `
        <td>${producto._id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.price}</td>
        <td>${producto.code}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td>${producto.statatus}</td>
        <td>${producto.thumbnails}</td>
        <th>
        `;
    });
})

const formulario = document.getElementById("product-form" , function (event){
    event.preventDefault();

    const titulo = document.getElementById("titulo").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const code = document.getElementById("code").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value
    
    
    const producto = {
        title:titulo,
        description:description,
        price:price,
        code:code,
        stock:stock,
        category:category
    }
    socket.emit('agregarProducto' , producto);
    formulario.requestFullscreen()
})
