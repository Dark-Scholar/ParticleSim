class FormHandler {
  private form: HTMLFormElement;

  constructor(formId: string) {
    this.form = document.querySelector(`#${formId}`);
  }

  getInputValue(inputId: string) {
    const input: HTMLInputElement = this.form.querySelector(`#${inputId}`);
    return input.value;
  }

  setInputValue(inputId: string, value: string) {
    const input: HTMLInputElement = this.form.querySelector(`#${inputId}`);
    input.value = value;
  }
}

export default FormHandler;