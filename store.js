if(document.readyState==='loading')
{
  addEventListener('DOMContentLoaded',ready);
}
else
{
  ready();
}


function ready()
{
  var removeCartItemButton=document.getElementsByClassName('btn-danger');
console.log(removeCartItemButton);
for(var i=0;i<removeCartItemButton.length;i++)
{
  var button=removeCartItemButton[i];
  button.addEventListener("click",removeItem)
}


var quantityInput=document.getElementsByClassName('cart-quantity-input')
for(var i=0;i<quantityInput.length;i++)
{
  var input=quantityInput[i];
  input.addEventListener('change',quantityChanged);
}


var addToCartButtons = document.getElementsByClassName('shop-item-button')
for(var i=0;i<addToCartButtons.length;i++)
{
  var button=addToCartButtons[i];
  button.addEventListener('click',addToCartClicked);
}
 document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked );
}
function removeItem(event){
  var buttonClicked=event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}
function quantityChanged(event)
{
  var input=event.target;
  if(isNaN(input.value) || input.value <= 0)
  {
    input.value = 1;
  }
  updateCartTotal();
}
function purchaseClicked()
{
  alert("Thank You for your purchase");
  var cartItems=document.getElementsByClassName('cart-items')[0];
  while(cartItems.hasChildNodes())
  {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal();
}
function addToCartClicked(event)
{
  var button=event.target;
  var shopItem=button.parentElement.parentElement;
  var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title,price,imageSrc);
  updateCartTotal();
}
function addItemToCart(title,price,imageSrc)
{
  var cartRow = document.createElement('div');
 cartRow.classList.add('cart-row');
  var cartItems=document.getElementsByClassName('cart-items')[0];
  var cartItemName=cartItems.getElementsByClassName('cart-item-title');
  for(var i=0;i<cartItemName.length;i++)
  {
    if(cartItemName[i].innerText === title)
    {
      alert("this item is already added to cart");
      return ;
    }
  }
  var cartRowcontent=`
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
  `
    cartRow.innerHTML = cartRowcontent;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
}
function updateCartTotal()
{
  var cartContinerIter=document.getElementsByClassName('cart-items')[0];
  var cartRows=cartContinerIter.getElementsByClassName('cart-row');
  var total=0;
  for(var i=0;i<cartRows.length;i++)
  {
     var cartRow=cartRows[i];
     var priceElement=cartRow.getElementsByClassName('cart-price')[0];
     var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0];
      var price=parseFloat(priceElement.innerHTML.replace('$',''));
      var quantity=quantityElement.value;
      total=total+(price* quantity);
  }
  total=Math.round(total*100)/100;
  document.getElementsByClassName('cart-total-price')[0].innerText='$'+total;
}
