const solve = document.querySelector(".avgSpeed__button");
const result = document.querySelector(".avgSpeed__result");
const fields = document.querySelectorAll(".input__field");
const form = document.querySelector(".input__wrapper");

const handleForm = (event) => event.preventDefault();
form.addEventListener("submit", handleForm);

let v1, vsr, fractionOfS;

const StringToFraction = 
  (x) => [Number(x.split("/")[0]), Number(x.split("/")[1])];

const countT = () => {
  let n1 = StringToFraction(fractionOfS)[0]; // (3/10) => 3
  let d = StringToFraction(fractionOfS)[1]; // (3/10) => 10
  let n2 = d - n1; // (3/10) => 7
  let nominator = -vsr * d * v1 * n2 ;
  let denominator = vsr * d * n1 - d*d *v1;
  return [nominator, denominator];
}

const NWD = (a, b) => {
  while (b) {
    c = a % b;
    a = b;
    b = c;
  }
  return a;
}

const showResult = (a,b, nwd=0) => {
  if(nwd === b){
    return `<div class="result__solution">${a / b}
    <span class="result__unit">km/h</span>
    </div>`;
  }else{
    return `
    <div class="result__fraction">
      <div class="result__nominator">${a / nwd}</div>
      <div class="result__denominator">${b / nwd}</div>
    </div>
    <div class="result__solution">
      &nbsp;=&nbsp;
      ${Math.round((a / b) * 1000) / 1000}
      <span class="result__unit">km/h</span>
    </div>`;
  }
}

function simplify(fraction) {
  let a = Math.round(fraction[0] * 1000);
  let b = Math.round(fraction[1] * 1000);
  let nwd = NWD(a, b);
  if (((a / b) * 10) % 10 == 0)
    return showResult(a, b,nwd);
  else
  return showResult(a, b,nwd);
}



solve.addEventListener("click", () => {
  if (fields[0].value == "" || fields[1].value == "" || fields[2].value == "") {
    result.textContent = "Wypełnij wszystkie pola";
    return;
  } else {
    v1 = parseFloat(document.querySelector("#speed1").value);
    vsr = parseFloat(document.querySelector("#speed2").value);
    fractionOfS = document.querySelector("#distance").value;
    result.innerHTML = simplify(countT());
  }
});
