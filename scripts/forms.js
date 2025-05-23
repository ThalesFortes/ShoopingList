import {createItem, createItensList} from './itemList.js'
import { getItensFromLocalStorage } from './storage.js';
import { getCheckboxInput } from './checkbox.js';
import { removeItemButton } from './remove.js';

export function initialList (){
  window.onload = function () {
    const form = document.querySelector("form")
    form.addEventListener('submit',createItem)

    const itens = getItensFromLocalStorage()
    itens.forEach((itens) =>{
      const checkbox = getCheckboxInput(itens)
      const button = removeItemButton(itens.id)
      createItensList(button, checkbox, itens)
    })   
  };
}