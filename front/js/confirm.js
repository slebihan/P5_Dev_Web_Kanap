function Order(){
    const order = document.getElementById("orderId");
    order.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}
Order();