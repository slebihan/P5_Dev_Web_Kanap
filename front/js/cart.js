let productLocalStorage = JSON.parse(localStorage.getItem("basket"));

function displayStorage() {
  if (productLocalStorage === null) {
    const titleCart = document.querySelector(".cartAndFormContainer h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";
  } else {
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

      fetch(
        "http://localhost:3000/api/products/" + productLocalStorage[i].idKanap
      )
        .then((result) => result.json())
        .then((product) => {
          let price = document.createElement("p");
          price.classList.add("prix");
          productItemContentTitlePrice.appendChild(price);

          price.innerText = product.price + " € ";
          console.log(price.innerHTML);
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

function deleteProduct() {
  let deleteBtn = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < deleteBtn.length; j++) {
    deleteBtn[j].addEventListener("click", (e) => {
      e.preventDefault();

      let deleteId = productLocalStorage[j].idKanap;
      let deleteColor = productLocalStorage[j].colorKanap;

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
    });
  }
}
deleteProduct();

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
    fetch(
      "http://localhost:3000/api/products/" + productLocalStorage[i].idKanap
    )
      .then((result) => result.json())
      .then((product) => {
        totalPrice += productLocalStorage[i].qtyKanap * product.price;
        let productTotalPrice = document.getElementById("totalPrice");
        productTotalPrice.innerHTML = totalPrice;
      });
  }
}
getTotals();

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

//Création RegExp
let emailRegExp = new RegExp("^[a-zA-Z0-9-._]+@[a-zA-Z0-9-_]+[.][a-z]+$");
let charRegExp = new RegExp("^[ a-zA-ZÀ-ÿ-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-ZÀ-ÿ]+)+");

//Instauration formulaire avec regex
function validFields() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML =
        "Ce champ ne doit pas contenir de caractères spéciaux.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML =
        "Ce champ ne doit pas contenir de caractères spéciaux.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
validFields();

const orderBtn = document.getElementById("order");

// Passage de commande
orderBtn.addEventListener("click", (e) => {
    (firstName = document.getElementById("firstName").value),
    (lastName = document.getElementById("lastName").value),
    (address = document.getElementById("address").value),
    (city = document.getElementById("city").value),
    (email = document.getElementById("email").value);

  if (
    emailRegExp.test(email) &&
    charRegExp.test(firstName) &&
    charRegExp.test(lastName) &&
    charRegExp.test(city) &&
    addressRegExp.test(address)
  ) {
    submitForm(e);
  } else {
    alert("Veuillez vérifier les informations saisies");
  }
});

//
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


// Soumission du formulaire
function submitForm(e) {
  e.preventDefault();

  const sendFormData = makeRequestbody();

  const options = {
    method: "POST",
    body: JSON.stringify(sendFormData),
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
