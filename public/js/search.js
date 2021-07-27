const form = document.getElementById('id_ser');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { search, method } = event.target;

  const response = await fetch(`/main/search`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: search.value }),
  });
  const result = await response.json();
  window.location.href=`/info/${result._id}`;
});
