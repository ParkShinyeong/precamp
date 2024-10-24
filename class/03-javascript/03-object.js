const profile = {
    name: "박신영", 
    age: 25, 
    height: 168, 
    school: "경상국립대학교", 
    job: "백수"
}

// 키는 비어있을 수 없지만 값은 비어있을 수 있다. 


console.log(profile.name); 
console.log(profile["job"])

let student = [
    {name: "짱구", age: 15},
    {name: "철수", age: 13}, 
    {name: "맹구", age: 10}, 
    {name: "훈이", age: 14}
]

console.log(student[1].name); 

const fruits = [
    { number:1 , title:"레드향" }, 
    { number:2 , title:"샤인머스캣" }, 
    { number:3 , title:"산청딸기" }, 
    { number:4 , title:"한라봉" }, 
    { number:5 , title:"사과" }, 
    { number:6 , title:"애플망고" }, 
    { number:7 , title:"딸기" }, 
    { number:8 , title:"천혜향" }, 
    { number:9 , title:"과일선물세트" }, 
    { number:10 , title:"귤" }
]

for(let i = 0; i < fruits.length; i++) {
    let printRank = fruits[i].number + " " + fruits[i].title; 
    console.log(printRank); 
}