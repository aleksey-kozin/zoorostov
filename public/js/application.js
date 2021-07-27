const reg = document.querySelector('.reg');
const log = document.querySelector('.log');
const container = document.querySelector('.container');
const btn_reg = document.querySelector('#btn_reg');
const containerAnimal = document.querySelector('.animal-container');
const btnAnimal = document.querySelector('.btn-inner-center');

if (reg) {
  reg.addEventListener('click', async (event) => {
    event.preventDefault();

    const response = await fetch('/regform');
    const data = await response.text();
    const form = document.querySelector('#registration');
    if (form == null) {
      if (document.getElementById('log_div')) {
        document.getElementById('log_div').remove();
      }
      if (containerAnimal || btnAnimal) {
        containerAnimal.remove();
        btnAnimal.remove();
      }
      const divForm = document.createElement('div');
      divForm.innerHTML = data;
      container.appendChild(divForm);
    }
  });
}

if (log) {
  log.addEventListener('click', async (event) => {
    event.preventDefault();
    const response = await fetch('/logform');
    const data = await response.text();
    const form = document.querySelector('#login');
    if (form == null) {
      if (document.getElementById('reg_div')) {
        document.getElementById('reg_div').remove();
      }
      if (containerAnimal || btnAnimal) {
        containerAnimal.remove();
        btnAnimal.remove();
      }
      const divForm = document.createElement('div');
      divForm.innerHTML = data;
      container.appendChild(divForm);
    }
  })

}


const btnAnimals = document.querySelector('.btn-animals');
const addContainer = document.querySelector('.add-container');


if(btnAnimals) {
  btnAnimals.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const response = await fetch(`/main/add`, {
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    let items = document.querySelectorAll('.card-inner').length;
    const sliced = result.slice(items);
    
    sliced.forEach(element => {
  
      
     
      const div = document.createElement('div');
      div.className = "card card-inner";
      div.style.width = "25rem";
      div.innerHTML = `
      <img src=${element.img[0]} class="card-img-top" alt="phot">
      <div class="card-body">
        <h1 class="card-title">${element.name}</h1>
        <p class="card-text">${element.description.slice(0,60)}...</p>
        <a href="/info/${element._id}" class="btn btn-primary">Подробная информация</a>
      </div>
      `
      addContainer.appendChild(div);
      btnAnimals.style.display = 'none';
    });
  })
}


  if (btnAnimals) {
    btnAnimals.addEventListener('click', async (e) => {
      e.preventDefault();


    const response = await fetch(`/main/add`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    let items = document.querySelectorAll('.card-inner').length;
    const sliced = result.slice(items);


    sliced.forEach((element) => {
      const div = document.createElement('div');
      div.className = 'card card-inner';
      div.style.width = '25rem';
      div.innerHTML = `

    <img src=${element.img[0]} class="card-img-top" alt="phot">
    <div class="card-body">
      <h1 class="card-title">${element.name}</h1>
      <p class="card-text">${element.description.slice(0, 60)}...</p>
      <a href="/info/${element._id
          }" class="btn btn-primary">Подробная информация</a>
    </div>
    `;
        addContainer.appendChild(div);
        btnAnimals.style.display = 'none';
      });
    });
  }

