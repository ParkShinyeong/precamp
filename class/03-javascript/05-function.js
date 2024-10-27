let time = 180; 

document.querySelector("button").addEventListener("click", () => {
    const randomNum = String(Math.floor(Math.random()*999999)).padStart(6, "0"); 
    // document.getElementsByClassName("authentication__number").innerText = randomNum; 
    /* 
    getElementsByClassName : 단일 요소만 리턴하지 않고, 요소들의 컬렉션을 반환한다. 
    수정하려는 요소를 지정하려면 querySelector을 사용해야 한다. 
    */

    document.querySelector(".authentication__number").innerText = randomNum; 
    document.querySelector(".authentication__number").style.color = "#" + randomNum

    setInterval(() => {
        if(time >= 0) {
            document.querySelector(".minute__number").innerText = String(Math.floor(time / 60)); 
            document.querySelector(".second__number").innerText = String(time % 60).padStart(2, "0"); 
            time--; 

            // ? 시간이 완료되면 인증완료 버튼을 비활성화 함 
            if(time === -1) {
                document.querySelector(".authentication__close").disabled = true; 
            }
        }
    }, 1000)
})

