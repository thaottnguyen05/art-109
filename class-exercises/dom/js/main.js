
console.log("hello hello");


let pageTitle = document.querySelector("#page-title")

// Javascript Timeout changes h1 title after 3 seconds
setTimeout(function(){
    pageTitle.style.color = "pink";
    // console.log("timeout worked!")
} , 3000)

let header = document.querySelector("header")
let body = document.querySelector("body")
// Click event on header changes background color
header.onclick = function() {
    // console.log("clicked header");
    body.style.backgroundColor = "black";
}

