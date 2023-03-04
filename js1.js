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