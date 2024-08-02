
//validate search word input so that to prevent spaces and numbers in word
let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', (event) => {
    // console.log(event.which);
    if ((event.which === 32) || (event.which >= 48 && event.which <= 57)) {
        event.preventDefault();

    }
});



//Grab search button
let btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', searchWord);

function searchWord(event) {
    //prevent default submission of the form by clicking button
    event.preventDefault();

    let searchInput = document.getElementById('searchInput');
    let searchValue = searchInput.value;
    searchValue = searchValue.trim();

    let container = document.getElementById('container');
    let wordElement = document.getElementById('word');
    container.innerHTML = "";
    wordElement.innerHTML = "";

    if (searchValue != "") {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;
        async function makeRequest() {
            const response = await fetch(url);
            if(response.ok){
                const json = await response.json();
                // console.log(json);
                populate(json);

            }else{
                container.innerHTML = `<h1 class="text-center">WORD "${searchValue}" not Found</h1>`;
            }
            

        }

        makeRequest();

    }


}


function populate(json){

    let container = document.getElementById('container');
    
    
    let searchedWord = json[0].word.toUpperCase();
    let wordElement = document.getElementById('word');
    wordElement.innerHTML = `WORD: ${searchedWord}`;

    let meanings = json[0].meanings;
    
    let html = ``;

    meanings.forEach(element =>{

         html+= `<div class="container">
                    <div class="row">
                    <h1 class="text-center text-primary">${element.partOfSpeech}</h1>
                    <div class="card mx-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title text-warning">DEFINITIONS</h5>
                                <ul class="list-group list-group-flush">
         `;

         let definitions = element.definitions;
        definitions.forEach(element=>{
             html+= `<li class="list-group-item border-danger">${element.definition}</li>`;
        });

        //below is end of first(definitions card)
        html+= `    </ul>
                </div>
            </div>
        `;


        // synonyms Card
        html+= `
        <div class="card mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title text-warning">SYNONYMS</h5>
            <ul class="list-group list-group-flush">
        `;

        let synonyms = element.synonyms;
        synonyms.forEach(element=>{
            html+= `
                    <li class="list-group-item border-danger">${element}</li>
            `;
        });

        //below end of 2nd (synonyms) card

        html+= `
                    </ul>
                </div>
            </div>
        `;

        //3rd Antonyms Card
        html+= `
        <div class="card mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title text-warning">ANTONYMS</h5>
            <ul class="list-group list-group-flush">
        `;

        let antonyms = element.antonyms;
        antonyms.forEach(element =>{
            html+= `
                    <li class="list-group-item border-danger">${element}</li>
            `;
        });

        //below end of 3rd(antonyms) card and container

        html+= `
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    <hr>
        `;



    });



    //now put the html in container
    container.innerHTML = html;

}