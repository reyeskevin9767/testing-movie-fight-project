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
it('After searching, dropdown opens up', () => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));

  const dropdown = document.querySelector('.dropdown');

  // Check if dropdown does have 'is-active'
  expect(dropdown.className).to.include('is-active');
});
