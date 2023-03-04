const loadAiInformation = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayAiInformation(data.data.tools, dataLimit);
            return data.data.tools;
        })
        .catch(error => console.log(error));
}

            //Display fetched data

const displayAiInformation = (info, dataLimit, sortDataByDate) => {

    const seeMoreButton = document.getElementById('see-more-button');
    const cardContainer = document.getElementById('card-container');


           //Restricting data

    if (info.length > 6 && dataLimit) {
        info = info.slice(0, 6);
    }
    else {
        seeMoreButton.classList.add('d-none');
    }  


    //Sorting by Date
    document.getElementById('date-button').addEventListener('click', async () => {;
        const sortedData = info.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
        toggleSpinner(true);
        const cardContainer = document.getElementById('card-container');
        cardContainer.textContent = '';

        //Fetching each data sorting by date 
        info.forEach(sortedData => {
        processData(sortedData);
        toggleSpinner(false);
        return;
        });
    });

//without sorting by date 

    info.forEach(data => {
        processData(data);
        toggleSpinner(false);
    });
}
// Spinner
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

// detailes more button
document.getElementById('see-more-button').addEventListener('click', function () {
    toggleSpinner(true);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    loadAiInformation();
})

//Fetch operation
const loadAiInformationById = async (id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayAiInformationById(data.data);
    }
    catch (error) {
        console.log(error);
    }
}


