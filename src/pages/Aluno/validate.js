import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';

const formValid = (nome, sobrenome, email, idade, peso, altura) => {
  let errors = false;
  if (nome.length < 3 || nome.length > 50) {
    errors = true;
    toast.error('Nome precisa ter entre 3 e 50 caracteres.');
  }
  if (sobrenome.length < 3 || sobrenome.length > 50) {
    errors = true;
    toast.error('Sobrenome precisa ter entre 3 e 50 caracteres.');
  }
  if (!isEmail(email)) {
    errors = true;
    toast.error('Digite um email válido.');
  }
  if (
    !isInt(String(idade)) ||
    idade.length > 2 ||
    idade.length < 1 ||
    idade <= 0
  ) {
    errors = true;
    toast.error('Insira uma idade válida.');
  }
  if (peso <= 0 || !isFloat(String(peso))) {
    errors = true;
    toast.error('Peso precisa ser um número.');
  }
  if (altura <= 0 || !isFloat(String(altura))) {
    errors = true;
    toast.error('Altura precisa ser um número.');
  }

  return errors;
};

export default formValid;
