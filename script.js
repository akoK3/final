const currencySelect = document.getElementById("currencySelect");
const currencyTo = document.getElementById("currencyTo");
const converter = document.getElementById("converter");
const finalText = document.getElementById("finalText");
let newOption;
let newOptionTo;
let k;
let currencyObject
let a;
let b;

async function fetchdata() {
  const url = "https://v6.exchangerate-api.com/v6/d541debdeb335519d1b310c4/latest/USD";

  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    currencyObject = result; // Assign to the global variable

    const currencyCount = Object.keys(result.conversion_rates).length;
    const values = Object.keys(result.conversion_rates);

    for (let i = 0; i < currencyCount; i++) {
      newOption = document.createElement("option");
      newOption.setAttribute("value", values[i]);
      newOption.textContent = values[i];
      currencySelect.appendChild(newOption);

      newOptionTo = document.createElement("option");
      newOptionTo.setAttribute("value", values[i]);
      newOptionTo.textContent = values[i];
      currencyTo.appendChild(newOptionTo);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchdata();

converter.addEventListener("click", () => {
  a = currencySelect.value; 
  b = currencyTo.value;
  const rateA = currencyObject.conversion_rates[a];
  const rateB = currencyObject.conversion_rates[b];
  k = rateB / rateA;
  const text = `1 ${a} is equal to ${k.toFixed(2)} ${b}`;
  finalText.textContent = text;
});
