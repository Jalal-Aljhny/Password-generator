let copyBtn = document.querySelector(
  "body section.result .container img"
) as HTMLImageElement;
let passwordField = document.querySelector(
  "body section.result .container p"
) as HTMLParagraphElement;
let lengthPass = document.querySelector(
  "body main .container > div span"
) as HTMLSpanElement;
let changeLength = document.querySelector(
  "body main .container form input[type='range']"
) as HTMLInputElement;
let checkInputs = document.querySelectorAll(
  "body main .container form div:not(:last-child) input"
) as NodeListOf<HTMLInputElement>;
let paginations = document.querySelectorAll(
  "body main .container form > div:last-child div span"
) as NodeListOf<HTMLSpanElement>;
let difficultDegree = document.querySelector(
  "body main .container form > div:last-child p + div p"
) as HTMLParagraphElement;
enum degrees {
  vEasy = "very easy",
  easy = "easy",
  medium = "medium",
  hard = "hard",
}
let checked: number = 0;
let submitBtn = document.querySelector(
  "body main .container div.submit"
) as HTMLDivElement;
let difficulty = {
  vE: "abcdefghijklmnopqrstuvwxyz",
  e: "ABCDEFGHIJKLMNOPKRSTUVWXYZ",
  m: "1234567890",
  h: `~\`!@#$%^&*()_-+={[}]|\:;"'<,>.?/\\`,
};
let base: string;
let successMsg = document.getElementById("msg") as HTMLDivElement;

copyBtn.addEventListener("click", (): void => {
  if (passwordField.textContent !== "") {
    navigator.clipboard.writeText(`${passwordField.textContent}`);
    successMsg.classList.add("show");
  }
  window.setTimeout(() => {
    successMsg.classList.remove("show");
  }, 1500);
});
changeLength.addEventListener("input", getValue);
function getValue(): void {
  lengthPass.innerHTML = changeLength.value;
}
getValue();
document.forms[0].addEventListener("submit", (e): void => {
  e.preventDefault();
});
function countChecked(): number {
  checked = 0;
  checkInputs.forEach((input): void => {
    if (input.checked) {
      checked += 1;
    }
    if (input.id == "lower" && input.checked) {
      checked = 2;
    }
    if (input.id == "numbers" && input.checked) {
      checked = 3;
    }
    if (input.id == "symbols" && input.checked) {
      checked = 4;
    }
  });
  for (let i = 0; i < checked; i++) {
    checkInputs[i].checked = true;
  }
  base = "";
  switch (checked) {
    case 1:
      difficultDegree.innerHTML = degrees.vEasy;
      base += difficulty["vE"];
      break;
    case 2:
      difficultDegree.innerHTML = degrees.easy;
      base += difficulty["vE"];
      base += difficulty["e"];
      break;
    case 3:
      difficultDegree.innerHTML = degrees.medium;
      base += difficulty["vE"];
      base += difficulty["e"];
      base += difficulty["m"];
      break;
    case 4:
      difficultDegree.innerHTML = degrees.hard;
      base += difficulty["vE"];
      base += difficulty["e"];
      base += difficulty["m"];
      base += difficulty["h"];
      break;
    default:
      difficultDegree.innerHTML = "";
  }
  return checked;
}
function paginationsShow(): void {
  paginations.forEach((pagination): void => {
    pagination.classList.remove("active");
  });
  for (let i = 0; i < countChecked(); i++) {
    paginations[i].classList.add("active");
  }
}
paginationsShow();
checkInputs.forEach((input): void => {
  input.addEventListener("change", paginationsShow);
});
submitBtn.addEventListener("click", (): void => {
  if (countChecked() < 1) {
    successMsg.children[0].innerHTML =
      "Please Check at least one of strength options";
    successMsg.classList.add("show");
    window.setTimeout(() => {
      successMsg.classList.remove("show");
      window.setTimeout(() => {
        successMsg.children[0].innerHTML = "Password Copied !";
      }, 1100);
    }, 2000);
  }
  generate();
});
function generate() {
  let password = "";
  if (countChecked() > 0) {
    for (let i = 0; i < Number(lengthPass.innerHTML); i++) {
      password += base[Math.floor(Math.random() * base.length)];
    }
    passwordField.innerHTML = password;
    if (password.length < Number(lengthPass.innerHTML) - 1) {
      generate();
    }
  }
}
