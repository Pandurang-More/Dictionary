const input=document.querySelector('input');
const btn=document.querySelector('button'); 
const dictionary=document.querySelector('.dictionary-app');

async function dictionaryFn(word) {
    const res =  await fetch( `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

    const data = await res.json();
    return data[0];
}

btn.addEventListener('click', fetchAndCreateCard);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchAndCreateCard();
});


async function fetchAndCreateCard() {
    const data= await dictionaryFn(input.value);
    console.log(data);

    let PartsOfSpeechArray=[]
    for(let i=0; i<data.meanings.length; i++) {
        PartsOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    dictionary.innerHTML = `
  <div class="card">
    <div class="property">
      <span class="card-property">Word:</span>
      <span class="card-property">${data.word}</span>
    </div>
    <div class="property">
      <span class="card-property">Phonetics:</span>
      <span class="card-property">${data.phonetic || 'N/A'}</span>
    </div>
    <div class="property">
      <span>
      <audio controls src="${data.phonetics.find(p => p.audio)?.audio || ''}"></audio>

      </span>
    </div>
    <div class="property">
      <span>Definition:</span>
      <span>${data.meanings[0].definitions[0].definition}</span>
    </div>
    <div class="property">
      <span >Example:</span>
      <span>${data.meanings[1].definitions[0].example || 'No example available'}</span>
    </div>
    <div class="property">
      <span >${PartsOfSpeechArray.map(e=>e).join(' ,')}</span>
    </div>
  </div>
`;

}