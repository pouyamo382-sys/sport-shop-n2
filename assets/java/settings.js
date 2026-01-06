document.addEventListener('DOMContentLoaded', () => {
  const switchInput = document.getElementById('themeSwitch');
  if (!switchInput) return;

  const savedTheme = localStorage.getItem('theme') || 'light';

  document.body.classList.remove('light', 'dark');
  document.body.classList.add(savedTheme);
  switchInput.checked = savedTheme === 'dark';

  switchInput.addEventListener('change', () => {
    const theme = switchInput.checked ? 'dark' : 'light';

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    localStorage.setItem('theme', theme);
  });
});