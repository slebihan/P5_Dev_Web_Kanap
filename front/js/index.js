
async function fetchProducts() {
    let products = await fetch('http://localhost:3000/api/products');
    console.log("La liste des produits a bien été récupérée !")
    return products.json();
}
//Récupération du tableau de produits disponibles

async function listProducts() {
   await fetchProducts()
    .then( (product) => {
        for (let i=0; i < product.length; i++) {	
            
            // Insertion de l'élément "a"
            let KanapLink = document.createElement("a");
            document.querySelector(".items").appendChild(KanapLink);
            KanapLink.href = `product.html?id=${product[i]._id}`;

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            KanapLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = product[i].imageUrl;
            productImg.alt = product[i].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = product[i].description;
        }
    });
    console.log("La liste des produits a bien été créée !");
}
//Création des articles via la liste récupérée précédemment
listProducts();

