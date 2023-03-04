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
