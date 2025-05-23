export const setItensInLocalStorage = (itens) => {
  window.localStorage.setItem("itens", JSON.stringify(itens));
}

export const getItensFromLocalStorage = () => {
  const localItens = JSON.parse(window.localStorage.getItem("itens"))
  return localItens ? localItens : []
}

export const getNewId = () =>{
  const itens = getItensFromLocalStorage();
  const lastID = itens[itens.length - 1]?.id;
  return lastID ? lastID + 1 : 1;
}

export const getNewItemData = (event) => {
  const description = event.target.newItem.value;
  const id = getNewId();
  return {id,description};
}


