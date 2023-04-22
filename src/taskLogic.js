function getInputValues() {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const defaultDate = document.getElementById('date').value;
  const priority = document.getElementById('priority').value;

  let day = defaultDate.slice(8, 10);
  let month = defaultDate.slice(5, 7);
  let year = defaultDate.slice(0, 4);

  if (month.startsWith('0')) {
    month = month.substring(1);
  }
  if (day.startsWith('0')) {
    day = day.substring(1);
  }

  let date = `${month}/${day}/${year}`;

  if (name === '' || description === '' || date === '' || priority === '') {
    document.getElementById('error-text').style.display = 'block';
    return;
  }

  return { name, description, date, priority };
}

export default getInputValues;
