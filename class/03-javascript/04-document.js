function greeting() {
    document.getElementById("target").innerText = "world";
    document.getElementById("input").value = "World"

}

const button = document.querySelector("button"); 
button.addEventListener("click", () => {
    document.getElementById("target").innerText = "Hello world"; 
})