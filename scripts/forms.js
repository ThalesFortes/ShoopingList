import { itens, setItensInLocalStorage, getItensFromLocalStorage } from "./storage";



const list = document.querySelector("ul");
const item = document.getElementById("newItem");


const getNewId = () =>{
  const itens = getItensFromLocalStorage();
  const lastID = itens[itens.length - 1]?.id;
  return lastID ? lastID + 1 : 1;
}

const getNewItemData = (event) => {
  const description = event.target.sucessCheck.value();
  const id = getNewId();
  return {id,description};
}





const createItem = (event) => {
  event.preventDefault()
  
}


form.addEventListener("submit", (event) =>{
  event.preventDefault()
})


window.onload = function () {
  const form = document.querySelector("form");
}