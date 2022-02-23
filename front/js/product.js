//Récupération de l'id via les paramètres de l'url
const idProduct = new URL(window.location.href).searchParams.get("id");

//Récupération des sélecteurs pour les futurs modifications
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

//Récupération de l'article grace a l'id + affichage des données de ce dernier
getProducts();

//Récupération de l'article grace a l'id + affichage des données de ce dernier
async function getProducts() {
  await fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then((product) => {
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      titleProduct.innerHTML = product.name;
      priceProduct.innerHTML = product.price;
      descriptionProduct.innerHTML = product.description;
      document.title = product.name;
        
      for (let i = 0; i < product.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("value", product.colors[i]);
        color.innerHTML = product.colors[i];
        colorsProduct.appendChild(color);
      }
    });
}

let addToCartBtn = document.getElementById('cart')

addToCartBtn.addEventListener("click", addToCart);

function addToCart(){

    let idKanap = idProduct;
    let nameKanap = document.querySelector("#title").textContent;
    let colorKanap = document.querySelector("#colors").value;
    let qtyKanap = document.querySelector("#quantity").value;
    let imgKanap = img.src;
    let altImg = img.alt;

    let productCartObj = {
        idKanap: idProduct,
        nameKanap: nameKanap,
        colorKanap: colorKanap,
        qtyKanap: qtyKanap,
        imgKanap: imgKanap,
        altImg: altImg,
      };

if(localStorage.length === 0){

      let productCart = []

      productCart.push(productCartObj);
    
      let objCart = JSON.stringify(productCart);
      localStorage.setItem("basket", objCart);

    }

else{

    let productCart = JSON.parse(localStorage.getItem("basket"));
 
    const resultFind = productCart.find(
        (el) => el.idKanap === idProduct && el.colorKanap === colorKanap
      );
      //Si le produit commandé est déjà dans le panier
    
        if (resultFind) {
       
            let newQuantite = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
    
            resultFind.qtyKanap = newQuantite;
            localStorage.setItem("basket", JSON.stringify(productCart));
    
        //Si le produit commandé n'est pas dans le panier
        }

        else{

            productCart.push(productCartObj);
    
            let objCart = JSON.stringify(productCart);
            localStorage.setItem("basket", objCart);

        }
    }
}

