const img = document.querySelector('.img-fluid');
const formUpload = document.getElementById('formUpload');
const formUploadSubmit = document.getElementById('formUploadSubmit');

if (img) {
  img.addEventListener('click', (event) => {

    formUpload.classList.toggle('hide')
  })
}

if(formUploadSubmit) {

  formUploadSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData()
    const fileField = formUploadSubmit[0].files[0]
  
    formData.append('username', 'abc123');
    formData.append('pictures', fileField)
  
    const response = await fetch('/profile/foto', {
      method: 'PUT',
      body: formData
    })
    const result = await response.json();
  
  
    img.src = `/img/${result}`
  
    formUpload.classList = 'hide';
  
  })
}


