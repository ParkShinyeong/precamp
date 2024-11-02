const phone1 = document.getElementById("p1"); 
const phone2 = document.getElementById("p2"); 
const phone3 = document.getElementById("p3"); 
const authenticBtn = document.querySelector(".authentication__number__btn"); 
const authenticNumber = document.querySelector(".authentication__number"); 
const submitAuthenticBtn = document.querySelector(".submit__authentication__btn")
const signUpBtn = document.querySelector(".signup__btn"); 

const minute = document.querySelector(".minute"); 
const second = document.querySelector(".second"); 


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
        authenticBtn.style.cssText = "color: #0068FF ;  cursor: pointer"
    }
}

[phone1, phone2, phone3].forEach((phone) => {
    phone.addEventListener("input", () => activateAuthenticBtn()); 
})

// 인증 번호 전송 버튼을 누르면 토큰이 전달되고 타이머가 시작된다. 
let isStarted = false; 
let timer; 

authenticBtn.addEventListener("click", () => {
    if(!isStarted) {
        isStarted = true; 
        // 인증 완료 버튼 활성화 
        submitAuthenticBtn.removeAttribute("disabled"); 
        submitAuthenticBtn.style.cssText = "color: white; background-color: #0068FF; cursor: pointer"
        
        // 버튼을 누르면 토큰 생성 후 화면에 보여준다. 
        const token = String(Math.floor(Math.random()*999999)).padStart(6, "0"); 
        authenticNumber.innerText = token; 
        // 3분 타이머 동작 (0:00 형식 유지)
        getTokenTimer();
    }
})

submitAuthenticBtn.addEventListener("click", () => finishAuthentic(timer));

const getTokenTimer = () => {
    let time = 180; 
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

const disabledBtn = (btn) => {
    btn.style.cssText = "color: #d2d2d2;border: 1px solid #d2d2d2";
    btn.disabled = true; 
}

// 3분 이내 인증 완료 버튼을 누르면 인증이 완료되었습니다. 알림창 표시. 
const finishAuthentic = (interval) => {
    clearInterval(interval); 
    window.alert("인증이 완료되었습니다.")
    disabledBtn(authenticBtn)
    
    // 가입하기 버튼 활성화 
    signUpBtn.style.cssText = "color: #0068FF ; border: 1px solid #0068FF; cursor: pointer"
    signUpBtn.removeAttribute("disabled")
}


// 토큰 정보, 타이머, 버튼 초기화
const resetTimer = () => {
    disabledBtn(submitAuthenticBtn);
    authenticNumber.innerText = "000000"; 
    minute.innerText = "3"; 
    second.innerText = "00";
    time = 180; 
}


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
    return repassword !== "" && password === repassword; 
}

const userInputs = [
    { 
        errorId: "email__error", 
        errorMessage: "이메일이 올바르지 않습니다.", 
        checking: checkEmail
    }, {
        errorId: "name__error",
        errorMessage: "이름이 올바르지 않습니다.", 
        checking: checkName
    }, {
        errorId: "password__error",
        errorMessage: "비밀번호가 올바르지 않습니다.", 
        checking: checkPassword
    }, {
        errorId: "repassword__error",
        errorMessage: "비밀번호가 일치하지 않습니다.", 
        checking: checkRepassword
    }, {
        errorId: "region__error",
        errorMessage: "지역을 선택해주세요.", 
        checking: () => document.querySelector("#region").value !== "default"

    }, {
        errorId: "gender__error",
        errorMessage: "성별을 선택해주세요.", 
        checking: () => {
            const genderRadio = document.querySelectorAll(".gender__radio"); 
            return Array.from(genderRadio).some(radio => radio.checked); 
        }
    }
]



// 이메일, 이름, 비밀번호, 비밀번호 재확인, 지역, 성별 선택은 가입하기 버튼 클릭 시 유효성 체크
signUpBtn.addEventListener("click", () => {
    let isValid = true; 
    userInputs.forEach((user) => {
        if(!user.checking()) {
            document.getElementById(user.errorId).innerText = user.errorMessage; 
            isValid = false;
        } else {
            document.getElementById(user.errorId).innerText = ""; 
        }
    })

    if(isValid) {
        window.alert("가입이 완료되었습니다.")
    }
})

