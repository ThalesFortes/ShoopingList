import {getNewId} from './storage.js'

export const removeItemButton = () => {
  const button = document.createElement("button")
  
  const img = document.createElement("img")
  img.setAttribute("src", "../assets/icons/trash.svg")
  img.setAttribute("alt","Botão de exclusão do item")

  button.appendChild(img)

  return button

}