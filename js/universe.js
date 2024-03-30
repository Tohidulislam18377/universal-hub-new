
const universe = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  const data = await res.json()
  displayData(data?.data?.tools);
};

const displayData = (getData) => {
  const cardContainer = document.getElementById('card-container')
  getData.map(x => {
    // console.log(x);

    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
        <div class="card main-section">
              <img src="${x.image ? x.image : 'No Image Founded'}" class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-title">1. ${x.features[0]}</p>
                <p class="card-title">2. ${x.features[1]}</p>
                <p class="card-title">3. ${x.features[2]}</p>
                <hr>
                <h5 class="card-title">1. ${x.name}</h5>
                <div class="btn-section">
                <p class="card-text"><i class="fa-solid fa-message"></i> ${x.published_in}</p>
                <button onclick="modalSection('${x?.id}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="fa-solid fa-square-up-right"></i>
              </button>           
                </div>
              </div>
            </div>
        `
    cardContainer.appendChild(createDiv);
  })
};

const modalSection = (getId) => {
  console.log(getId);
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${getId}`)
    .then(res => res.json())
    .then(data => {
      const modalData = data.data;
      console.log(modalData);

      const modalContainer = document.getElementById('modal-container');
      modalContainer.innerHTML = '';
      const createDiv = document.createElement('div');
      createDiv.innerHTML = `
        <div class="main-section">
        <div class="grid-section-size">
       <h4>${modalData.accuracy.description}</h4>  
       <div class="grid-section">
       <div>
       <p class="modal-plan">${modalData.pricing[0].plan}</p>
       <p class="modal-price">${modalData.pricing[0].price}</p>
       </div>
       <div>
       <p class="modal-plan">${modalData.pricing[1].plan}</p>
       <p class="modal-price">${modalData.pricing[1].price}</p>
       </div>
       <div>
       <p class="modal-plan">${modalData.pricing[2].plan}</p>
       <p class="modal-price">${modalData.pricing[2].price}</p>
       </div>
       </div>   
        </div>
        <div class="feature-section">
        <div>
        <h1>Feature</h1>
        <p>${modalData.features[1].feature_name}</p>
        <p>${modalData.features[2].feature_name}</p>
        <p>${modalData.features[3].feature_name}</p>
        </div>
        <div>
        <h1>Integration</h1>
        <p>${modalData.integrations[0] ? modalData.integrations[0] : 'No Data Founded'}</p>
        <p>${modalData.integrations[1] ? modalData.integrations[1] : 'No Data Founded'}</p>
        <p>${modalData.integrations[2] ? modalData.integrations[2] : 'No Data Founded'}</p>
        </div>
        </div>
        <div>
        </div>
      
        `
      modalContainer.appendChild(createDiv)
    })
    .catch((error) => { console.log(error); })
}


universe();