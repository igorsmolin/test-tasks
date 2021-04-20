const INITIAL_URL =
  'http://any_domain/filter?size=M&color=1&color=2&manufacturer=aaa&manufacturer=ddd';

const url = new URL(INITIAL_URL);
[setSize, setColors, setManufacturers, setSale].forEach((fn) => fn(url));

function setSize(url) {
  const size = url.searchParams.get('size');
  if (!size) return;
  const radioButtons = document.querySelectorAll('input[name="size"]');
  let checkedButton = [...radioButtons].find((input) => input.value === size);
  setChecked(checkedButton);

  const sizeDiv = document.getElementById('sizeDiv');
  sizeDiv.addEventListener('click', function (event) {
    if (event.target.type !== 'radio') return;

    if (event.target !== checkedButton) {
      checkedButton = event.target;
      url.searchParams.set('size', checkedButton.value);
      resetColors();
      resetManufacturers();
      resetSale();
      console.log(url.toString());
    }
  });
}

function setColors(url) {
  const colors = url.searchParams.getAll('color');
  if (!colors.length) return;
  const colorCheckboxes = document.querySelectorAll('div.color input');
  let checkedColorCheckboxes = [...colorCheckboxes].filter((input) =>
    colors.includes(input?.value)
  );
  checkedColorCheckboxes.forEach(setChecked);

  const colorDiv = document.getElementById('colorDiv');
  colorDiv.addEventListener('click', function (event) {
    if (event.target.type !== 'checkbox') return;
    url.searchParams.delete('color');

    if (event.target.checked) {
      checkedColorCheckboxes.push(event.target);
      checkedColorCheckboxes.sort((prev, next) => prev.value - next.value);
    } else {
      checkedColorCheckboxes = checkedColorCheckboxes.filter(
        (item) => item !== event.target
      );
    }
    resetSize();
    checkedColorCheckboxes.forEach((input) =>
      url.searchParams.append('color', input.value)
    );
    resetManufacturers();
    resetSale();
    console.log(url.toString());
  });
}

function setManufacturers(url) {
  let manufacturers = url.searchParams.getAll('manufacturer');
  if (!manufacturers.length) return;
  const options = document.querySelectorAll('option');

  [...options].forEach((option) => {
    if (manufacturers.includes(option?.value)) {
      option.setAttribute('selected', 'true');
    }

    option.addEventListener('click', function (event) {
      resetSize();
      resetColors();
      if (event.ctrlKey) {
        if (this.selected) {
          manufacturers.push(this.value);
          manufacturers.sort();
        } else {
          manufacturers = manufacturers.filter((val) => val !== this.value);
        }

        url.searchParams.delete('manufacturer');
        manufacturers.forEach((val) =>
          url.searchParams.append('manufacturer', val)
        );
      } else {
        if (manufacturers.includes(this.value) && manufacturers.length === 1)
          return;

        manufacturers.length = 0;
        manufacturers.push(this.value);
        url.searchParams.delete('manufacturer');
        url.searchParams.set('manufacturer', this.value);
      }
      resetSale();
      console.log(url.toString());
    });
  });
}

function setSale(url) {
  const sale = url.searchParams.get('sale');
  if (!sale) return;
  const saleCheckbox = document.querySelector('input.sale');
  saleCheckbox?.value === sale && setChecked(saleCheckbox);
}

function setChecked(input) {
  return input?.setAttribute('checked', 'true');
}

function resetSize() {
  const radioButtons = document.querySelectorAll('input[name="size"]');
  const checkedButton = [...radioButtons].find((input) => input.checked);
  url.searchParams.set('size', checkedButton.value);
}

function resetColors() {
  const colorCheckboxes = document.querySelectorAll('div.color input');
  const checkedColorCheckboxes = [...colorCheckboxes].filter(
    (input) => input.checked
  );
  url.searchParams.delete('color');
  checkedColorCheckboxes.forEach((input) =>
    url.searchParams.append('color', input.value)
  );
}

function resetManufacturers() {
  const options = document.querySelectorAll('option');
  const optionsSelected = [...options].filter((option) => option.selected);
  url.searchParams.delete('manufacturer');
  optionsSelected.forEach((option) =>
    url.searchParams.append('manufacturer', option.value)
  );
}

function resetSale() {
  const saleCheckbox = document.querySelector('input.sale');
  url.searchParams.delete('sale');
  if (saleCheckbox.checked) {
    url.searchParams.append('sale', saleCheckbox.value);
  }
}
