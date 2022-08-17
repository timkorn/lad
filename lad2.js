// изменённый js файл
var formElement = document.forms["formElement"];
function handleFocus(evt) {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
  evt.target.classList.add("focused");
}
function handleOutFocus(evt) {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
}
formElement.addEventListener("focusin", handleFocus);
formElement.addEventListener("focusout", handleOutFocus);
