
iniIndex();


function iniIndex() {
    const continueBtn = document.getElementById("continueBtn");

    continueBtn.addEventListener("click", () => {
        window.location.href = "./pages/login.html";
    })

}
