export const showAlert = () =>{
  const footer = document.getElementById("showAlert")
  
  footer.classList.remove("display-none")

 setTimeout(()=>{
    footer.classList.add("display-none")
  }, 3000)
}

export const closeAlertModal = () =>{
  const closeButton = document.getElementById("closeModal")
  closeButton.addEventListener("click",()=>{
    document.getElementById("showAlert").classList.add("display-none")
  })
}

