//Récupération du localStorage

let productLocalStorage = JSON.parse(localStorage.getItem("basket"));

//Création et Affichage des produits dans la page web//

//fonction displayStorage() : Affichage et création des produits dans la page web
//Params : /
//Return : /

function displayStorage() {
  //Affichage s'il y a rien dans le localStorage
  if (productLocalStorage === null) {
    const titleCart = document.querySelector(".cartAndFormContainer h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";
  } 
  //Afichage s'il y a des articles dans le localStorage
    else {
    for (let i = 0; i < productLocalStorage.length; i++) {
      // Création de la balise "article" et insertion dans la section
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

      // Insertion de l'élément "div" pour l'image produit
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      // Insertion de l'image
      let productImage = document.createElement("img");
      productDivImg.appendChild(productImage);
      productImage.src = productLocalStorage[i].imgKanap;
      productImage.alt = productLocalStorage.altImgProduit;

      // Insertion de l'élément "div" pour la description produit
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        "cart__item__content__description";

      // Insertion du titre h2
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = productLocalStorage[i].nameKanap;

      // Insertion du prix

      fetch("http://localhost:3000/api/products/" + productLocalStorage[i].idKanap)
        .then((result) => result.json())
        .then((product) => {
          let price = document.createElement("p");
          price.classList.add("prix");
          productItemContentTitlePrice.appendChild(price);
          price.innerText = product.price + " € ";
        });

      // Insertion de la couleur
      let productColor = document.createElement("p");
      productColor.className = "couleur";
      productItemContentTitlePrice.appendChild(productColor);
      productColor.innerHTML = productLocalStorage[i].colorKanap;
      productColor.style.fontSize = "20px";

      // Insertion de l'élément "div"
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      // Insertion de "Qté : "
      let productQty = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQty);
      productQty.innerHTML = "Qté : ";

      // Insertion de la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = productLocalStorage[i].qtyKanap;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      // Insertion de "p" supprimer

      let productDelete = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.innerHTML = "Supprimer";
    }
  }
}
displayStorage();

let deleteBtn = document.querySelectorAll(".deleteItem");
for (let j = 0; j < deleteBtn.length; j++) {
  deleteBtn[j].addEventListener("click", (e) => {
    deleteProduct();
    e.preventDefault();
  });

//fonction deleteProduct() : Suppression d'un produit dans le panier
//Params : Aucun
// Return : Aucun

  function deleteProduct() {
    let deleteId = productLocalStorage[j].idKanap;
    let deleteColor = productLocalStorage[j].colorKanap;

    // On sélectionne le produit à supprimer en fonction de sa couleur et son id
    productLocalStorage = productLocalStorage.filter(
      (elt) => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor
    );

    // envoyer les nouvelles données dans le localStorage

    localStorage.setItem("basket", JSON.stringify(productLocalStorage));

    // avertir de la suppression et recharger la page
    alert("Votre article a bien été supprimé.");

    //Si pas de produits dans le local storage on affiche que le panier est vide
    if (productLocalStorage.length === 0) {
      Panier = document.querySelector("#cartAndFormContainer h1");
      Panier.innerHTML = "Votre Panier est vide";
      localStorage.clear();
    }
    //Refresh rapide de la page
    location.reload();
  }
}

//fonction getTotals() : Récupération du prix total et de la quantité des produits souhaités
//Params : Aucun
// Return : Aucun

function getTotals() {
  // Récupération du total des quantités
  var elemsQtt = document.getElementsByClassName("itemQuantity");
  var myLength = elemsQtt.length;

  totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;

  // Récupération du prix total
  totalPrice = 0;

  for (let i = 0; i < myLength; ++i) {
    fetch("http://localhost:3000/api/products/" + productLocalStorage[i].idKanap)
      .then((result) => result.json())
      .then((product) => {
        totalPrice += productLocalStorage[i].qtyKanap * product.price;
        let productTotalPrice = document.getElementById("totalPrice");
        productTotalPrice.innerHTML = totalPrice;
      });
  }
}
getTotals();

//fonction modifyQtt() : modification de la quantité et mise à jour du prix total avec la fonction getTotals()
//Params : Aucun
// Aucun : Aucun

function modifyQtt() {
  let quantity = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < quantity.length; k++) {
    quantity[k].addEventListener("change", (event) => {
      event.preventDefault();

      productLocalStorage[k].qtyKanap = quantity[k].valueAsNumber;

      localStorage.setItem("basket", JSON.stringify(productLocalStorage));

      getTotals();
    });
  }
}
modifyQtt();


//fonction validFirstName() : validation de l'input FirstName conformément à la RegExp
//Params : Aucun
//Return : True ou False selon ce qui est enregistré dans l'input

  //validation du prénom avec RegExp
function validFirstName(){
 
    let inputFirstName = document.querySelector('#firstName')
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    let charRegExp = new RegExp("^[ a-zA-ZÀ-ÿ-]+$");

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
      return true
    } else {
      firstNameErrorMsg.innerHTML =
        "Ce champ ne doit pas contenir de caractères spéciaux.";
      return false
    }
}

//fonction validLastName() : validation de l'input LastName conformément à la RegExp
//Params : Aucun
//Return : True ou False selon ce qui est enregistré dans l'input

//validation du nom avec RegExp
function validLastName() {

  let inputLastName = document.querySelector('#lastName')
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  let charRegExp = new RegExp("^[ a-zA-ZÀ-ÿ-]+$");

  if (charRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = "";
    return true
  } else {
    lastNameErrorMsg.innerHTML =
      "Ce champ ne doit pas contenir de caractères spéciaux.";
    return false
  }
};

//fonction validAddress() : validation de l'input Address conformément à la RegExp
//Params : Aucun
//Return : True ou False selon ce qui est enregistré dans l'input

//validation de l'adresse avec RegExp
function validAddress(){

  let inputAddress = document.querySelector('#address')
  let addressErrorMsg = inputAddress.nextElementSibling;
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-ZÀ-ÿ]+)+");

  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = "";
    return true
  } else {
    addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    return false
  }
};

//fonction validCity() : validation de l'input City conformément à la RegExp
//Params : Aucun
//Return : True ou False selon ce qui est enregistré dans l'input

//validation de la ville avec RegExp
function validCity(){

  let inputCity = document.querySelector('#city')
  let cityErrorMsg = inputCity.nextElementSibling;
  let charRegExp = new RegExp("^[ a-zA-ZÀ-ÿ-]+$");

  if (charRegExp.test(inputCity.value)) {
    cityErrorMsg.innerHTML = "";
    return true
  } else {
    cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    return false
  }
};

//fonction validEmail() : validation de l'input City conformément à la RegExp
//Params : Aucun
//Return : True ou False selon ce qui est enregistré dans l'input

//validation de l'email avec RegExp
function validEmail(){

  let inputEmail = document.querySelector('#email')
  let emailErrorMsg = inputEmail.nextElementSibling;
  let emailRegExp = new RegExp("^[a-zA-Z0-9-._]+@[a-zA-Z0-9-_]+[.][a-z]+$");

  if (emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = "";
    return true
  } else {
    emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    return false
  }}

//fonction validFieldsOnChange() : Ecoute de l'addEventListener quand change chaque input du formulaire et validation selon la RegExp
//Params : Aucun
//Return : Aucun

//Validation des champs au changement avec tabulation
function validFieldsOnChange(){

let form = document.querySelector(".cart__order__form");

form.firstName.addEventListener("change", function () {
  validFirstName();
});
form.lastName.addEventListener("change", function () {
  validLastName();
});
form.address.addEventListener("change", function () {
  validAddress();
});
form.city.addEventListener("change", function () {
  validCity();
});
form.email.addEventListener("change", function () {
  validEmail();
});
}
validFieldsOnChange()


// Passage de commande au click sur le bouton de commande

const orderBtn = document.getElementById("order");

orderBtn.addEventListener("click", (e) => {
    submitForm(e);
});

//fonction makeRequestbody() : construction de ce qui sera traité par le serveur à la soumission du formulaire
//Params : Aucun
//Return : sendFormData

function makeRequestbody() {
  //construction de l'objet contact
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  //Construction d'un array d'id depuis le local storage
  let products = [];
  for (let i = 0; i < productLocalStorage.length; i++) {
    products.push(productLocalStorage[i].idKanap);
  }

  // je mets les valeurs du formulaire et les produits sélectionnés
  // dans un objet...
  const sendFormData = {
    contact,
    products,
  };
  return sendFormData;
}

//fonction submitForm() : Soumission du formulaire et orderId mis dans le localStorage
//Params : Aucun
//Return : Aucun

// Soumission du formulaire
function submitForm(e) {
  e.preventDefault();

  if((validFirstName() && validLastName() && validAddress() && validCity() && validEmail()) ){
  
  const options = {
    method: "POST",
    body: JSON.stringify(makeRequestbody()),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html?id=" + data.orderId;
    });
  }
  else{
    console.log(alert('merci de vérifier les informations saisies'))
  }
}
    