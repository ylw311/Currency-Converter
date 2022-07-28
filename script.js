const select = document.querySelectorAll(".currency");

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("button");

fetch("https://api.frankfurter.app/currencies").then((data) => data.json()).then((data) => {
  display(data);
})

// display currency list in select option box, from api link
function display(data){
  const entries = Object.entries(data);
  for(var i=0; i < entries.length; i++) {
    select[0].innerHTML += `<option value="${entries[i][0]}"> ${entries[i][0]} </option>`;
    select[1].innerHTML += `<option value="${entries[i][0]}"> ${entries[i][0]} </option>`;
  }
};
/*

// two ways to convert currency
button.addEventListener("click", () => {
  check();           
});

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        check();
    }
});

*/

//auto convert every second
var intervalId = window.setInterval(function(){
  check()
}, 100);

function check(){
  let currency1 = select[0].value;
  let currency2 = select[1].value

  let value = input.value;

  if(currency1 != currency2){
    convert(value, currency1, currency2);
  } else {
    output.value = value;
  }
}

function convert(value, currency1, currency2) {
  const host = "api.frankfurter.app";
  fetch(
    `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
  ).then((val) => val.json()).then((val) => {
      output.value = Object.values(val.rates)[0];
    });
}


