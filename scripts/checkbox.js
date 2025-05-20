import { setItensInLocalStorage, getItensFromLocalStorage } from "./storage";

export const getCheckboxInput = ({id , description , checked}) => {
  const li = document.createElement("li");
  li.className = "line-style";
  

  const label = document.createElement("label");
  label.className = "flex gap-1 center checkbox-label";
  label.setAttribute = ("for", `${id}-item`);

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox";
  checkbox.name = "sucessCheck";
  checkbox.className = "sucessCheck"
  checkbox.setAttribute = ("arial-label", "Marcar como concluido");
  checkbox.id = `${id}-item`
  checkbox.checked = checked || false
  checkbox.addEventListener('change', onChangeClick)

  const div = document.createElement("div")
  div.className = "checkbox-style"

  const span = document.createElement("span")
  span.textContent = description

  li.appendChild(label)
  li.appendChild(checkbox)
  li.appendChild(div)
  li.appendChild(span)

  return li;
}


export const onChangeClick = (event) => {
  const [id] = event.target.id.splice('-')
  const itens = getItensFromLocalStorage()

  const updateItens = itens.map((itens) => {
    return parseInt(id) === itens.id
    ? {...itens, checked: event.target.checked}
    : itens
  })

  setItensInLocalStorage(updateItens)
}