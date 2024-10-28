// 끝말잇기
// 단어를 입력하고 버튼을 누르면 
// input 태그의 값을 읽는다. => document.getElementById("word").value
// 제시어의 끝 글자와 입력값의 첫 글자를 비교한다 
// 비교값이 같으면 결과란에 "정답입니다!",를 표시하고, 제시어를 입력값으로 변경한다 
// 비교값이 다르면 결과란에 "땡"을 표시하고 제시어는 변경하지 않는다. 


document.getElementById("search").addEventListener("click", () => {
    const input = document.getElementById("myword").value; 
    const prevWord = document.getElementById("word").innerText;
    const regex = /^[가-힣|]{2,}$/; 

    if(!regex.test(input)) {
        // 입력값 검사. 한글 2글자 이상
        document.getElementById("result").innerText = "한글 2글자 이상 입력해주세요"; 
    } else if(prevWord[prevWord.length - 1] === input[0]) {
        // 입력값의 첫글자와 제시어의 마지막 값이 같은 경우 
        document.getElementById("result").innerText = "정답입니다!"; 
        document.getElementById("word").innerText = input; 
        document.getElementById("myword").value = ""; 
    } else {
        // 입력값의 첫글자와 제시어의 마지막 값이 다른 경우 
        document.getElementById("result").innerText = "땡!"; 
        document.getElementById("myword").value = ""; 
    }
})
