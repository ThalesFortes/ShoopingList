import { setItensInLocalStorage, getItensFromLocalStorage } from "./storage.js";

export const getCheckboxInput = ({id , description , checked}) => {
  const label = document.createElement("label");
  label.className = "flex gap-1 center checkbox-label";
  label.setAttribute("for", `${id}-item`);
  label.setAttribute("title", `Marcar ${description} como concluido`)

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox";
  checkbox.name = "sucessCheck";
  checkbox.className = "sucessCheck"
  checkbox.setAttribute("arial-label", "Marcar ${description}  como concluido");
  checkbox.id = `${id}-item`
  checkbox.checked = checked || false
  checkbox.addEventListener('change', onChangeClick)

  const div = document.createElement("div")
  div.className = "checkbox-style"

  const span = document.createElement("span")
  span.textContent = description

  label.appendChild(checkbox)
  label.appendChild(div)
  label.appendChild(span)
  
  return label;
}


export const onChangeClick = (event) => {
  const [id] = event.target.id.split('-')
  const itens = getItensFromLocalStorage()

  const updateItens = itens.map((itens) => {
    return parseInt(id) === itens.id
    ? {...itens, checked: event.target.checked}
    : itens
  })

  setItensInLocalStorage(updateItens)
}