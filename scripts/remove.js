import {getItensFromLocalStorage, getNewId, setItensInLocalStorage} from './storage.js'

const removeItemList = (itemID) =>{
    const itens = getItensFromLocalStorage()
    const updateItens = itens.filter(({id}) => parseInt(id) !== parseInt(itemID)) 
    setItensInLocalStorage(updateItens)

    const itemElement = document.getElementById(itemID);
    if (itemElement) {
      document.querySelector("ul").removeChild(itemElement);
    }
}

export const removeItemButton = (itemID) => {
  const button = document.createElement("button")
  button.onclick = () => removeItemList(itemID)
  
  const img = document.createElement("img")
  img.setAttribute("src", "../assets/icons/trash.svg")
  img.setAttribute("alt","Botão de exclusão do item")

  button.appendChild(img)

  return button
}