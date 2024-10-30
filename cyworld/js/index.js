const homeBtn = document.getElementById("menu__home"); 
const jukeboxBtn = document.getElementById("menu__jukebox"); 
const gameBtn = document.getElementById("menu__game"); 
const home = "../index.html"
// 버튼 클릭 시 배경/글자 색이 바뀌고 페이지가 바뀐다. 


const clickNavigationBtn = (btn, link) => {
    resetAllBtn(); 
    btn.style.cssText = 'color: black; background-color: white';
    document.getElementById("contentFrame").setAttribute("src", link); 
}
s
const resetAllBtn = () => {
    [homeBtn, jukeboxBtn, gameBtn].forEach((btn) => {
        btn.style.cssText = 'color: white; background-color: #298EB5;';
    })
}


homeBtn.addEventListener("click", () => clickNavigationBtn(homeBtn, "/cyworld/home.html"))
jukeboxBtn.addEventListener("click", () => clickNavigationBtn(jukeboxBtn, "/cyworld/jukebox.html"))
gameBtn.addEventListener("click", () =>  clickNavigationBtn(gameBtn, "/cyworld/game.html"))

