const editAnimal = document.querySelector('.edit-animal');
const editPrice = document.querySelector('.edit-price');

let btn_price_ch = document.querySelector('#btn_price_ch');

let btn_price_ad = document.querySelector('#btn_price_ad');
/*--------------------------------*/

if (editAnimal) {

  // редактируем животных
  editAnimal.addEventListener('click', async (e) => {
    document.querySelector('.right-box').innerHTML = '';
    // выводим названия всех животных из базы
    e.preventDefault();
    const response = await fetch(`/admin/show`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    //условия отображения
    if (document.querySelector('.price-wrapper')) {
      document
        .querySelector('.left-box')
        .removeChild(document.querySelector('.price-wrapper'));
    }

    if (!document.querySelector('.animal-wrapper')) {
      const animals = document.createElement('div');
      animals.className = 'animal-wrapper';
      animals.style.display = 'block';
      let content = `<p class='wild-add'><i class="fas fa-plus-circle"></i></p>`;
      result.forEach((el) => {
        content += `<p class='wild'>${el}</p>`;
      });
      animals.innerHTML = content;
      document.querySelector('.left-box').appendChild(animals);
      // находим всех животных и выборочно редактируем
      document.querySelectorAll('.wild').forEach((el) => {
        el.addEventListener('click', (e) => {
          document.querySelector('.right-box').innerHTML = '';
          const wildWrapper = document.createElement('div');
          console.log(e.target)
          wildWrapper.className = 'wild-wrapper';

          wildWrapper.innerHTML = ` <div class="card card-edit-admin" style="width: 18rem;">

        <div class="input-group">
          <span class="input-group-text" id="inputGroup-sizing-default">Название</span>
          <input id="animal-name" value=${e.target.textContent} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="form-floating">
          <textarea id="animal-descr" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
          <label for="floatingTextarea2">Description</label>
        </div>
        <button type="submit" class="btn btn-secondary btn-update">Сохранить</button>
        <button type="button" class="btn btn-danger btn-delete">Удалить</button>
      </div>`;
          document.querySelector('.right-box').appendChild(wildWrapper);

            let updateAnimal = document.querySelector('.btn-update');
        updateAnimal.addEventListener('click', async (e) => {
          e.preventDefault();
          let name = document.getElementById('animal-name').value;
          let descr = document.getElementById('animal-descr').value;
          const response = await fetch(`/admin/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              descr
            })
          });
          const result = await response.json();
        })

          delete animals

          let deleteAnimal = document.querySelector('.btn-delete');
          deleteAnimal.addEventListener('click', async (e) => {
            e.preventDefault();
            let name = document.getElementById('animal-name').value;
            const response = await fetch(`/admin/delete`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
              })
            });
            
            console.log('send')
          })


        });
  
      });
    }


    // если в правом блоке нет обертки для редактирования животных, то по нажатию на + добавляем форму
    if (document.querySelector('.wild-add')) {
      document.querySelector('.wild-add').addEventListener('click', () => {
        document.querySelector('.right-box').innerHTML = '';
        const wildWrapper = document.createElement('div');
        wildWrapper.className = 'wild-wrapper';
        wildWrapper.innerHTML = ` 
        <div class="card animal-add-form">
          <form id="formUploadSubmitAdmin" action="/addAnimal" method="post" enctype="multipart/form-data">  
            <img src="" class="card-img-top" alt="..."> <br>
            <input type="file" name="pictures" />
              <div class="input-group">
                <span class="input-group-text" id="inputGroup-sizing-default">Название</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Description</label>
              </div>
            <button id="btnUploadSubmitAdmin" class="btn btn-secondary">Сохранить</button>
          </form>
        </div>
        `;
        document.querySelector('.right-box').appendChild(wildWrapper);


        let btnUploadSubmitAdmin = document.getElementById('btnUploadSubmitAdmin')


        btnUploadSubmitAdmin.addEventListener('click', async (event) => {

          event.preventDefault();

          const name = btnUploadSubmitAdmin.parentNode[1].value;
          const description = btnUploadSubmitAdmin.parentNode[2].value;

          const formData = new FormData()
          const fileField = btnUploadSubmitAdmin.parentNode[0].files[0]

          formData.append('name', name);
          formData.append('description', description)
          formData.append('pictures', fileField)

          const response = await fetch('/addAnimal', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json()

          console.log(result);

        })

      });
    }
  });

}





if (editPrice) {

  // редактируем тарифы
  editPrice.addEventListener('click', () => {
    document.querySelector('.right-box').innerHTML = '';
    if (document.querySelector('.animal-wrapper')) {
      document
        .querySelector('.left-box')
        .removeChild(document.querySelector('.animal-wrapper'));
    }
    if (!document.querySelector('.price-wrapper')) {
      const price = document.createElement('div');
      price.className = 'price-wrapper';
      price.style.display = 'block';
      price.innerHTML = `
        <p class='child'>Редактировать тарифы</p>
         `;
      document.querySelector('.left-box').appendChild(price);
      document.querySelector('.child').addEventListener('click', () => {
        document.querySelector('.right-box').innerHTML = '';
        const childWrapper = document.createElement('div');
        childWrapper.innerHTML = `
        
    <div class="form-group mb-3">
        <label for="exampleFormControlSelect1">Время посещения</label>
        <select class="form-control" id="Select1">
          <option>Выходные и праздники</option>
          <option>Будни</option>
        </select>
    </div>
  <div class="input-group mb-3">
    <span  name = "price" class="input-group-text" id="inputGroup-sizing-default">Цена для детей</span>
    <input id = "price_ch" name = "price" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
  </div>
  <div class="input-group mb-3">
    <span  name = "price" class="input-group-text" id="inputGroup-sizing-default">Цена для взрослых</span>
    <input id = "price_ad" name = "price" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
  </div>
  <button id = "btn_price_ch" type="button" class="btn btn-secondary">Сохранить</button>
        `;
        childWrapper.className = 'child-wrapper';
        document.querySelector('.right-box').appendChild(childWrapper);

        //---------------------------------------------//
        if (!btn_price_ch) {
          let price_ch = document.querySelector('#price_ch');
          // console.log(price_ch.value);
          let price_ad = document.querySelector('#price_ad');
          let select_ch = document.querySelector('#Select1');
          // console.log(select_ch);

          let btn_price_ch = document.querySelector('#btn_price_ch');
          btn_price_ch.addEventListener('click', async (event) => {
            event.preventDefault();
            console.log(select_ch.value, price_ch.value, price_ad.value);

            const status = select_ch.value === 'Будни' ? true : false;

            console.log(status);

            const response = await fetch(`/price/add`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                select_ch: status,
                priceChild: price_ch.value,
                priceAdult: price_ad.value,
              }),
            });
            const result = await response.json();
            console.log(result);
            window.location.href = `/admin`;
          });
        }

        //---------------------------------------------//
      });
      // взрослые
      document.querySelector('.adult').addEventListener('click', () => {
        document.querySelector('.right-box').innerHTML = '';
        const adultWrapper = document.createElement('div');
        adultWrapper.innerHTML = `

  <div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Цена</span>
    <input id = "price_ad" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
  </div>
  <button id = "btn_price_ad" type="button" class="btn btn-secondary">Сохранить</button>
        `;
        adultWrapper.className = 'adult-wrapper';
        document.querySelector('.right-box').appendChild(adultWrapper);


      });
    }

  });
}

/*--------------------------------*/
