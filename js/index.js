
var productNameInput =document.getElementById('productNameInput')
var productPriceInput = document.getElementById('productPriceInput')
var productCategoryInput = document.getElementById('productCategoryInput')
var productDescInput = document.getElementById('productDescInput')
var addBtn = document.getElementById('addBtn')
var products;
 var mainIndex = 0
 var searchInput = document.getElementById('searchInput')
 var productNameRegix = /^[A-Z][a-z0-9]{3,20}$/
 console.log(  productNameRegix.test('Samsung')         );

if (localStorage.getItem('products') != null)  {
    products= JSON.parse(localStorage.getItem('products'));
    disPlayProducts(); 
    
}else{
   products=[]
}




function addProduct(){
if (validateProductName(productNameInput.value)){
var product = {
    name:productNameInput.value  ,
    price:productPriceInput.value,
    category:productCategoryInput.value,
    desc:productDescInput.value,
}
if (productNameInput.value ==''||productPriceInput.value ==''||productCategoryInput.value ==''||productDescInput.value =='') {
    alert('error')
} else {
    if (addBtn.innerHTML=='Add Product') {
        products.push(product)
      
    } else {
        
products.splice(mainIndex, 1 , product)   
addBtn.innerHTML ='Add Product'

}

localStorage.setItem('products', JSON.stringify(products)) 
       disPlayProducts(); 
       clearForm ();

}
}


}
function disPlayProducts() {

    if (products.length > 0) {
        document.getElementById('tHead').innerHTML=
        `<th>Index</th>
        <th>Product Name </th>
        <th>Product Price </th>
        <th>Product Category </th>
        <th>Product Desc </th>
        <th>Update</th>
        <th>Delete</th>`
        
    }else{
        document.getElementById('tHead').innerHTML=''

    }

    var trs=''
for (var i = 0; i < products.length; i++) {
     trs += `<tr>
    <td>${i}</td>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].desc}</td>
    <td>
      <button onclick= updateProduct(${i}) class="btn btn-outline-warning">Update</button>
    </td>
    <td>
      <button onclick= deletProduct(${i}) class="btn btn-outline-danger">Delete</button>
    </td>
  </tr>`
 
    
}
 document.getElementById('tBody').innerHTML=trs
    
}
function clearForm(){
    productNameInput.value=''
productPriceInput.value=''
productCategoryInput.value=''
productDescInput.value=''
    
}
function deletProduct(i) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger mx-2",
          cancelButton: "btn btn-success mx-2"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            products.splice(i , 1)
            localStorage.setItem('products',JSON.stringify(products))
            disPlayProducts()
          swalWithBootstrapButtons.fire({
           
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product file is safe :)",
            icon: "error"
          });
        }
      });

   

}
function updateProduct(i) {
    console.log( products[i]);
   mainIndex =i
    productNameInput.value= products[i].name
    productPriceInput.value=products[i].price
    productCategoryInput.value=products[i].category
    productDescInput.value=products[i].desc

    addBtn.innerHTML='updateProduct'


    
}
function search() {
var searchTerm = searchInput.value


var trs=''
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
    trs += `<tr>
   <td>${i}</td>
   <td>${products[i].name}</td>
   <td>${products[i].price}</td>
   <td>${products[i].category}</td>
   <td>${products[i].desc}</td>
   <td>
     <button onclick= updateProduct(${i}) class="btn btn-outline-warning">Update</button>
   </td>
   <td>
     <button onclick= deletProduct(${i}) class="btn btn-outline-danger">Delete</button>
   </td>
 </tr>`
}

}
document.getElementById('tBody').innerHTML=trs
  
  
}



function validateProductName(productName) {
  var productNameRegix = /^[A-Z][a-z0-9]{3,20}$/
return productNameRegix.test(productName)

  // if (productNameRegix.test(productName)) {
  //   return true
    
  // } else {
  //   return false
    
  // }
}