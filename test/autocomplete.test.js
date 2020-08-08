//* Check if DOM element appears on webpage
const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

//* Setup testing environment before every test
//* Known as a hook
beforeEach(() => {
  document.querySelector('#target').innerHTML = '';
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData() {
      return [
        { Title: 'Avengers' },
        { Title: 'Not Avengers' },
        { Title: 'Other Movie' },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});

//* Check if autocomplete dropdown is closed
it('Dropdown starts closed', () => {
  const dropdown = document.querySelector('.dropdown');

  // Check if dropdown does not have 'is-active'
  expect(dropdown.className).not.to.include('is-active');
});

//* Check if dropdown is open after search
it('After searching, dropdown opens up', async () => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));

  await waitFor('.dropdown-item');

  const dropdown = document.querySelector('.dropdown');

  // Check if dropdown does have 'is-active'
  expect(dropdown.className).to.include('is-active');
});

//* Check if results appear
it('After serching, displays some results', async () => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));

  await waitFor('.dropdown-item');

  const items = document.querySelectorAll('.dropdown-item');

  expect(items.length).to.equal(3);
});
