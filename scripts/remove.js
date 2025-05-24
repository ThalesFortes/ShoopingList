import {getItensFromLocalStorage, setItensInLocalStorage} from './storage.js'
import {showAlert,closeAlertModal} from './modalAlert.js'

const removeItemList = (itemID) =>{
    const itens = getItensFromLocalStorage()
    const updateItens = itens.filter(({id}) => parseInt(id) !== parseInt(itemID)) 
    setItensInLocalStorage(updateItens)

    
    const itemElement = document.getElementById(`${itemID}-item`)?.closest('li');
    if (itemElement) {
      itemElement.remove();
    }
    showAlert()
}

export const removeItemButton = (itemID) => {
  const button = document.createElement("button")
  button.onclick = () => removeItemList(itemID)
  
  const img = document.createElement("img")
  img.setAttribute("src", "/assets/icons/trash.svg")
  img.setAttribute("alt","Botão de exclusão do item")

  button.appendChild(img)

  return button
}