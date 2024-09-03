import countryList from "./codes.js";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromValue = document.querySelector(".fromOptions select");
let toValue = document.querySelector(".toOptions select");
let result = document.querySelector(".result");

const url = 'https://forex-convertor.p.rapidapi.com/getExchangeRate?';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '425f39dd5fmsh2140c77ad45fb2fp12f88djsnd63928aafad4',
    'x-rapidapi-host': 'forex-convertor.p.rapidapi.com'
  }
};

for (const select of dropdowns) {
  for (const currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}

function updateFlag(element) {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  element.parentElement.querySelector("img").src = src;
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = document.querySelector("input");
  let amtValue = amt.value;
  if (amtValue < 1) {
    amtValue = 1;
    amt.value = "1"
  }
  const base_URL = `${url}from=${fromValue.value.toLowerCase()}&to=${toValue.value.toLowerCase()}`

  let response = await fetch(base_URL, options);
  let data = await response.text();
  const responseData = JSON.parse(data);
  const exchangeRate = parseFloat(responseData.exchangeRate);

  let outputRate = amtValue * exchangeRate;

  result.innerText = `${amtValue} ${fromValue.value} is equal to ${outputRate} ${toValue.value}`;
})

// done