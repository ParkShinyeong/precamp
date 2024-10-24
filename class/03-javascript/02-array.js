let classmates = ["철수", "훈이", "짱구", "유리", "맹구"]; 

console.log(classmates[0])
console.log(classmates[1]); 

console.log(classmates.includes("훈이"))
console.log(classmates.includes("짱아"))

console.log(classmates.length)

classmates.push("봉미선")
console.log(classmates.length)

classmates.pop(); 
console.log(classmates.length)


let developer = ["연봉", "워라밸", "명성", "존중", "실력"]
console.log(developer[3])

let dream = ["커리어점프", "성공", "할 수 있다"]

console.log(developer.concat(dream)); 

// 문자열도 배열처럼 다룰 수 있다. 
// 이메일 형식이 맞는지 확인
// 이메일 @전 마지막 4글자만 마스킹하기 

const email = "synyeong@gmail.com"

if(email.includes("@")) {
    // 이메일을 "@" 기준으로 나눈다. 
    const emailInfo = email.split("@"); 
    const user = emailInfo[0]; 
    const company = emailInfo[1]; 

    // 유저 부분 중 뒤에서 4글자를 마스킹한다. 
    let maskingUser = []; 
    for(let i = 0; i < user.length - 4; i++) {
        maskingUser.push(user[i]); 
    }
    for(let i = 0; i < 4; i++) {
        maskingUser.push("*")
    }

    // 마스킹 한 뒤 다시 이메일 형식으로 합쳐준다. 
    const maskingMail = maskingUser.join("") + "@" + company; 
    console.log(maskingMail); 
    
}