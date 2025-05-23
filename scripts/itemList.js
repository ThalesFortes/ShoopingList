import {getCheckboxInput} from "./checkbox.js"
import {removeItemButton} from "./remove.js"
import {getNewItemData, getItensFromLocalStorage, setItensInLocalStorage} from "./storage.js"


const createItensList = (button, checkbox) =>{
  const list = document.querySelector("ul");

  const li = document.createElement("li");
  li.className = "line-style";
  li.id = checkbox.id


  li.appendChild(checkbox)
  li.appendChild(button)

  list.appendChild(li)

  return list
}

export const createItem = (event) => {
  event.preventDefault();

  const newItemData = getNewItemData(event)

  const checkbox = getCheckboxInput(newItemData)
  const button = removeItemButton()
  createItensList(button,checkbox)

  console.log(createItensList)
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



