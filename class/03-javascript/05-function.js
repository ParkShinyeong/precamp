
let isStarted = false; 
document.querySelector("button").addEventListener("click", () => {
    if(!isStarted) {
        // 타이머가 작동 중이 아닐 때 - 인증번호 전송 및 타이머를 시작. 
        isStarted = true; 
        const randomNum = String(Math.floor(Math.random()*999999)).padStart(6, "0"); 
    
        document.querySelector(".authentication__number").innerText = randomNum; 
        document.querySelector(".authentication__number").style.color = "#" + randomNum
        document.querySelector(".authentication__close").disabled = false;

        let time = 180; 
        let timer = setInterval(() => {
            if(time >= 0) {
                document.querySelector(".minute__number").innerText = String(Math.floor(time / 60)); 
                document.querySelector(".second__number").innerText = String(time % 60).padStart(2, "0"); 
                time--; 
            } else {
                // ? 시간이 완료되면 인증완료 버튼을 비활성화 함 
                document.querySelector(".authentication__close").disabled = true; 
                isStarted = false; 
                console.log(isStarted)
                clearInterval(timer); // setInterval 중단
            }
        }, 1000)
    } 
})


// 핸드폰 번호 입력 시 자동 포커스 이동
const phone1 = document.getElementById("phone1"); 
const phone2 = document.getElementById("phone2");
const phone3 = document.getElementById("phone3");  

const changePhoneFocus = (tmp, next, len) => {
    let phone  = tmp.value; 
    if(phone.length === len ) {
        next.focus(); 
    }
}

phone1.addEventListener("input", () => changePhoneFocus(phone1, phone2, 3)); 
phone2.addEventListener("input", () => changePhoneFocus(phone2, phone3, 4)); 

// 전화번호가 모두 입력되었을 때 인증번호 전송 버튼을 활성화한다. 
const disableAuthenticationButton = () => {
    let authenticButton = document.querySelector(".authentication__button"); 
    if (phone1.value.length === 3 && phone2.value.length === 4 && phone3.value.length === 4) {
        authenticButton.disabled = false; 
    } else {
        authenticButton.disabled = true; 
    }
}

phone1.addEventListener("input", disableAuthenticationButton)
phone2.addEventListener("input", disableAuthenticationButton)
phone3.addEventListener("input", disableAuthenticationButton)