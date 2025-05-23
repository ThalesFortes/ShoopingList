import {getCheckboxInput} from "./checkbox.js"
import {removeItemButton} from "./remove.js"
import {getNewItemData, getItensFromLocalStorage, setItensInLocalStorage} from "./storage.js"


export const createItensList = (button, checkbox, id) =>{
  const list = document.querySelector("ul");

  const li = document.createElement("li");
  li.className = "line-style";
  li.id = id

  li.appendChild(checkbox)
  li.appendChild(button)

  list.appendChild(li)

  return list
}

export const createItem = (event) => {
  event.preventDefault();

  const newItemData = getNewItemData(event)

  const checkbox = getCheckboxInput(newItemData)
  const button = removeItemButton(newItemData.id)
  
  createItensList(button,checkbox, newItemData.id)

  const itens = getItensFromLocalStorage();
  const updateItens = [
    ...itens,
    {
      id: newItemData.id , 
      description:newItemData.description , 
      checked: false
    }
  ]
  setItensInLocalStorage(updateItens)
  document.getElementById("newItem").value = ''
}



