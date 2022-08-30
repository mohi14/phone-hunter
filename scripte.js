const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    displayPhones(data.data)
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

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
document.getElementById('btn-search').addEventListener('click', function () {
    //start spinner
    toggleSpinners(true);

    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhones(searchText);

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