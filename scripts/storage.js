export const setItensInLocalStorage = (itens) => {
  window.localStorage.setItem("itens", JSON.stringify(itens));
}

export const getItensFromLocalStorage = () => {
  const localItens = JSON.parse(window.localStorage.getItem("itens"))
  return localItens ? localItens : []
}