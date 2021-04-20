const nameInput = document.getElementById('name_input');
const { value } = nameInput;
nameInput.addEventListener('input', function() {
  this.classList.toggle('red', value !== this.value);
});
