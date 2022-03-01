// Ajout de l'orderID dans le DOM //

function Order(){
    const order = document.getElementById("orderId");
    order.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}
Order();