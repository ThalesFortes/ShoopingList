import { initForm } from './forms.js'
import {createItem} from './itemList.js'
import { setItensInLocalStorage } from './storage.js';

setItensInLocalStorage('')
const form = document.querySelector("form")
window.onload = function (event) {
  form.addEventListener('submit',createItem)
  
};
