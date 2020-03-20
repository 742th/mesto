
class FormValid {
  constructor(form, errors) {
    this.form = form;
    this.errors = errors;


    this.form.addEventListener('input', this.checkInputValidity.bind(this));
    this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
  }

  checkInputValidity(event) {
    if (event.target.value === '' || event.target.value === null) {
      // Надо исправить: вы обращаетесь в классе к переменной объявленной глобально, так делать нельзя
      event.target.nextElementSibling.textContent = this.errors.missInput;

    }

    if (event.target.value.length < 2) {
      // Надо исправить: вы обращаетесь в классе к переменной объявленной глобально, так делать нельзя
      event.target.nextElementSibling.textContent = this.errors.tooShort;

    }

    if (event.target.value.length > 30) {
      // Надо исправить: вы обращаетесь в классе к переменной объявленной глобально, так делать нельзя
      event.target.nextElementSibling.textContent = this.errors.tooLong;

    }

    if (event.target.validity.valid) {
      // Надо исправить: вы обращаетесь в классе к переменной объявленной глобально, так делать нельзя
      event.target.nextElementSibling.textContent = this.errors.noError;
    }

  }
  // чтобы делать кнопку сабмита активной и неактивной.
  setSubmitButtonState(event) {

    if (this.form.checkValidity() === true) {
      event.target.form.lastElementChild.removeAttribute('disabled', true);

    } else {
      event.target.form.lastElementChild.setAttribute('disabled', true);
    }
  }

}

