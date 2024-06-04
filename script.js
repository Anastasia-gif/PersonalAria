let butLogin = document.getElementById("button_enter");
let butRegistration = document.getElementById("button_registration");
let formLogin = document.getElementById("form_log");
let formRegistration = document.getElementById("form_reg");

butLogin.addEventListener('click', function(e){
    formLogin.style.display = 'block';
    formRegistration.style.display = 'none';
}) 
   butRegistration.addEventListener('click', function(e){
    formLogin.style.display = 'none';
    formRegistration.style.display = 'block';
   })

//Валидация полей
const form = document.querySelector(".form");
const inputList = Array.from(form.querySelectorAll(".type-input"));
const buttonElement = form.querySelector(".button");
const formErrorElement = form.querySelector(".empty-error");

startValidation();

function startValidation(){
  toggleButton();
  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    if(hasInvalidInput()){
      formError();
    }
  })
  inputList.forEach((inputElement)=>{
    inputElement.addEventListener('input',()=>{
      checkInputValidity(inputElement);
      toggleButton();
    })
  })
}

function checkInputValidity(inputElement){
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  }else{
    inputElement.setCustomValidity(checkLengthMismatch(inputElement))
  }
  if(!inputElement.validity.valid){
    toggleErrorSpan(inputElement,inputElement.validationMessage)
  }else{
    toggleErrorSpan(inputElement);
  }
}

function checkLengthMismatch(inputElement){
  if(inputElement.type !== "text"){
    return '';
  }
  const valueLength = inputElement.value.trim().length;
  if(valueLength < inputElement.minLength){
    return `Минимальное количество символов: ${inputElement.minLength}`;
  }
  return ''
}

function hasInvalidInput(){
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid
  })
}

function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  if(errorMessage){
    inputElement.classList.add('form__type-input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__error-active");
  }else{
    inputElement.classList.remove("form__type-input-error");
    errorElement.textContent = '';
    errorElement.classList.remove("form__error-active");
  }
}

function toggleButton(){
  if(hasInvalidInput()){
    buttonElement.classList.add("button-inactive");
    buttonElement.setAttribute("aria-disabled", "true");
  }else{
    buttonElement.classList.remove("button-inactive");
    buttonElement.setAttribute("aria-disabled", "false");
    formErrorElement.textContent = '';
  }
}

function formError(){
  const errorMessage = "Заполните все поля для отправки формы.";
  formErrorElement.textContent = errorMessage;
}