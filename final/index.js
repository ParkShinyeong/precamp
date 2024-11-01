
const phone1 = document.getElementById("p1"); 
const phone2 = document.getElementById("p2"); 
const phone3 = document.getElementById("p3"); 
const authenticBtn = document.querySelector(".authentication__number__btn"); 
const authenticNumber = document.querySelector(".authentication__number"); 
const submitAuthenticBtn = document.querySelector(".submit__authentication__btn")
const signUpBtn = document.querySelector(".signup__btn"); 

const minute = document.querySelector(".minute"); 
const second = document.querySelector(".second"); 

let isStarted = false; 
let isCompleteAuthentic = false; 
let time = 180; 
let timer; 

// 휴대전화 앞 칸이 모두 채워지면 다음 칸으로 커서 이동
const moveFocus = (prev, next, length) => {
    if(prev.value.length === length) {
        next.focus(); 
    }
}

phone1.addEventListener("input", () => moveFocus(phone1, phone2, 3)); 
phone2.addEventListener("input", () => moveFocus(phone2, phone3, 4)); 

// 휴대전화를 모두 입력하면 인증번호 전송 버튼이 활성화
const activateAuthenticBtn = () => {
    const length1 = phone1.value.length; 
    const length2 = phone2.value.length; 
    const length3 = phone3.value.length; 

    if(length1 === 3 && length2 === 4 && length3 === 4 && !isStarted) {
        authenticBtn.removeAttribute("disabled"); 
        authenticBtn.style.color = "#0068FF"
    }
}

[phone1, phone2, phone3].forEach((phone) => {
    phone.addEventListener("input", () => activateAuthenticBtn()); 
})


// 인증 번호 전송 버튼을 누르면 토큰이 전달되고 타이머가 시작된다. 
authenticBtn.addEventListener("click", () => {
    if(!isStarted) {
        isStarted = true; 
        // 인증 완료 버튼 활성화 
        submitAuthenticBtn.removeAttribute("disabled"); 
        submitAuthenticBtn.style.cssText = "color: white; background-color: #0068FF;"
        
        // 버튼을 누르면 토큰 생성 후 화면에 보여준다. 
        const token = String(Math.floor(Math.random()*999999)).padStart(6, "0"); 
        authenticNumber.innerText = token; 
        // 3분 타이머 동작 (0:00 형식 유지)
        timer = setInterval(() => {
            if(time >= 0) {
                minute.innerText = Math.floor(time / 60); 
                second.innerText = String(time % 60).padStart(2, "0"); 
                time--; 
            } else {
                clearInterval(timer); 
                isStarted = false; 
                resetTimer(); 
            }
        }, 1000)
    }
})

const disabledBtn = (btn) => {
    btn.style.cssText = "color: #d2d2d2;border: 1px solid #d2d2d2";
    btn.disabled = true; 
}

// 3분 이내 인증 완료 버튼을 누르면 인증이 완료되었습니다. 알림창 표시. 
const finishAuthentic = (interval) => {
    clearInterval(interval); 
    window.alert("인증이 완료되었습니다.")
    resetTimer(); 
    disabledBtn(authenticBtn)
    isCompleteAuthentic = true; 
}
submitAuthenticBtn.addEventListener("click", () => finishAuthentic(timer));

// 3분이 지나면 / 인증 버튼을 누르면 토큰 정보, 타이머, 버튼 초기화
const resetTimer = () => {
    disabledBtn(submitAuthenticBtn);
    authenticNumber.innerText = "000000"; 
    minute.innerText = "0"; 
    second.innerText = "00";
    time = 180; 
}


// 가입하기 버튼을 누르면 각 입력칸 검증. 빈 칸 아래에 경고를 띄운다. \


const checkEmail = () => {
    const email = document.querySelector("#user__email").value; 
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return emailRegex.test(email);  
}

const checkName = () => {
    const name = document.querySelector("#user__name").value; 
    const nameRegex = /([가-힣]{2,}|[a-zA-Z]{2,})/; 
    return  nameRegex.test(name);  
}

const checkPassword = () => {
    const password = document.querySelector("#user__password").value; 
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password); 

}
const checkRepassword = () => {
    const password = document.querySelector("#user__password").value; 
    const repassword = document.querySelector("#user__repassword").value; 
    return password === repassword; 
}

const checkRegion = () => { 
    const region = document.querySelector("#region");   
    return region.value !== "default"
}

const checkGender = () => {
    const genderRadio = document.querySelectorAll(".gender__radio"); 
    return Array.from(genderRadio).some(radio => radio.checked); 
}

// 에러 메세지 활성화 / 비활성화
const activateErrorMessage = (id) => {
    document.getElementById(id).className = "error__message__activate"  
}

const disableErrorMessage = (id) => {
    document.getElementById(id).className ="error__message"
}

const userInputs = [
    {
        input: document.querySelector("#user__email"), 
        errorId: "email__error", 
        checking: checkEmail
    }, {
        input: document.querySelector("#user__name"), 
        errorId: "name__error",
        checking: checkName
    }, {
        input: document.querySelector("#user__password") , 
        errorId: "password__error",
        checking: checkPassword
    }, {
        input: document.querySelector("#user__repassword") , 
        errorId: "user__repassword",
        checking: checkRepassword
    }
]; 

userInputs.forEach((user) => {
    user.input.addEventListener("change", () => {
        if(!user.checking()) {
            activateErrorMessage(user.errorId); 
        } else {
            disableErrorMessage(user.errorId); 
        }
    })
})

signUpBtn.addEventListener("click", () => {
    const completeInput = checkEmail() && checkName() && checkGender() && checkPassword() && checkRegion() && checkRepassword() && isCompleteAuthentic;
    if(completeInput) {
        window.alert("가입이 완료되었습니다.")
    } else {
        if(!checkRegion()) {
            activateErrorMessage("region__error")
        } else {
            disableErrorMessage("region__error")
        } 
        if(!checkGender()) {
            activateErrorMessage("gender__error")
        } else {
            disableErrorMessage("gender__error")
        }
        if(!isCompleteAuthentic) {
            activateErrorMessage("authentication__error")
        } else {
            disableErrorMessage("authentication__error")
        }
    }
})


