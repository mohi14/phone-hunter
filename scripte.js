const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    //show all 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //no phone found
    const noPhoneFound = document.getElementById('no-phones-massage')
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }

    phones.forEach(phone => {
        console.log(phone);
        const divPhones = document.createElement('div');
        divPhones.classList.add('col');
        divPhones.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(divPhones);
    });
    //stop spinner
    toggleSpinners(false);
}

const processSearch = (dataLimit) => {
    toggleSpinners(true);
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhones(searchText, dataLimit);

}

document.getElementById('btn-search').addEventListener('click', function () {
    //start spinner
    // toggleSpinners(true);

    // const inputField = document.getElementById('input-field');
    // const searchText = inputField.value;
    // loadPhones(searchText);
    processSearch(10);

})

const toggleSpinners = isLoadding => {
    const loadder = document.getElementById('spinners');

    if (isLoadding) {
        loadder.classList.remove('d-none');
    }
    else {
        loadder.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})