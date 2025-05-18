import { itens, setItensInLocalStorage, getItensFromLocalStorage } from "./storage";


const form = document.querySelector("form");
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


const getCheckboxInput = ({id , description , checked}) => {
  const li = document.createElement("li");
  li.className = "line-style";
  

  const label = document.createElement("label");
  label.className = "flex gap-1 center checkbox-label";
  label.setAttribute = ("for", `${id}-item`);

  const input = document.createElement("input")
  input.type = "checkbox";
  input.name = "sucessCheck";
  input.className = "sucessCheck"
  input.setAttribute = ("arial-label", "Marcar como concluido");
  input.id = `${id}-item`
  input.checked = checked || false



}


form.addEventListener("submit", (event) =>{
  event.preventDefault()
})
