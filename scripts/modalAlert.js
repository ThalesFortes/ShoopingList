export const showAlert = () =>{
  const footer = document.getElementById("showAlert")
  footer.classList.remove("display-none")
  footer.classList.remove("footer-hide")

  setTimeout(()=>{
    footer.classList.add("footer-hide");


    footer.addEventListener("animationend", function handler() {
      footer.classList.add("display-none")
      footer.classList.remove("footer-hide")
      footer.removeEventListener("animationend",handler)
    })
  }, 3000)
}

export const closeAlertModal = () => {
  const closeButton = document.getElementById("closeModal");
  closeButton.addEventListener("click", () => {
    const footer = document.getElementById("showAlert");
    footer.classList.add("footer-hide");

    footer.addEventListener("animationend", function handler() {
      footer.classList.add("display-none");
      footer.classList.remove("footer-hide");
      footer.removeEventListener("animationend", handler);
    });
  });
};
