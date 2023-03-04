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


//Display single fetched data by id
const displayAiInformationById = (info) => {
    console.log(info);
    console.log(info.features);

    const aiDetails = document.getElementById('ai-details');
    aiDetails.innerHTML = `
        <div class="border border-danger-subtle rounded-2 p-3" style="width: 100%; background-color: #f5dfcf57;">
                    <p class="fs-4 fw-bold text-center">${info.description ? info.description : 'Description Unavailable'}</p>
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <div class="rounded-2 bg-white p-1 p-md-3 text-center text-success fw-semibold">
                            <p>${info.pricing ? info.pricing[0].price : 'Free of Cost/'}</p>
                            <p>${info.pricing ? info.pricing[0].plan : 'Basic'}</p>
                        </div>
                        <div class="rounded-2 bg-white  p-1 p-md-3 text-center text-primary fw-semibold">
                            <p>${info.pricing ? info.pricing[1].price : 'Free of Cost/'}</p>
                            <p>${info.pricing ? info.pricing[1].plan : 'Pro'}</p>
                        </div>
                        <div class="rounded-2 bg-white  p-1 p-md-3 text-center text-warning fw-semibold">
                            <p>${info.pricing ? info.pricing[2].price : 'Free of Cost/'}</p>
                            <p>${info.pricing ? info.pricing[2].plan : 'Enterprise'}</p>
                        </div>
                    </div>
            
                    <div class="mt-3 d-flex justify-content-around gap-3 text-start">
                        <div class=" p-2">
                            <h3 class="fs-3 fw-semibold">Features</h3>
                            <ul id="feature">
                            
                            
                            </ul>
                        </div>

                        <div class=" p-2">
                            <h3 class="fs-3 fw-semibold">Integrations </h3>
                            <ul id="integration">
                                

                            </ul>
                        </div>
                    </div>
                    </div>
                <div class="border border-secondary-subtle rounded-2 p-3" style="width: 100%">
                        <div class="d-flex justify-content-center position-relative">
                            <img src="${info.image_link[0]}" class="img-fluid rounded-2">
                            <div style="position:absolute; top: 1%; right:1%; transform: translate(-1%, -1%);" id="btn-accuracy" >
                            
                            </div>
                        </div>
                        <h3 class="mt-3 fs-3 fw-semibold">${info.input_output_examples ? info.input_output_examples[0].input : 'Can you give any example?'}</h3>
                        <p>${info.input_output_examples ? info.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                    </div>
        `




