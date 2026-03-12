const manageLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.querySelector("#loading-spinner");

    if (isLoading) {
        loadingSpinner.classList.remove("hidden");  // spinner show
        document.getElementById("lesson-container").classList.add("hidden"); 
    } else {
        loadingSpinner.classList.add("hidden");   // spinner hide
        document.getElementById("lesson-container").classList.remove("hidden");
    }
};

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
     .then (res => res.json())
     .then (json => displayLessons(json.data))
}


const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    
    for ( const lesson of lessons) 
    {
         const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
        <button id="click-btn-${lesson.level_no}" onClick ="showWord(${lesson.level_no})" class="btn btn-outline btn-primary activee-unactive"><i class="fa-brands fa-leanpub"></i>
        lesson- ${lesson.level_no}</button>
        `;
        levelContainer.appendChild(lessonDiv);    
}
     
}
const removeActiveClass = () => {
    const buttons = document.querySelectorAll(".activee-unactive");
    buttons.forEach(button => {
        button.classList.remove("btn-active");
    });
}



const showWord = (id) => {
    manageLoadingSpinner(true);
    console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
        const clickedButton = document.getElementById(`click-btn-${id}`);
        removeActiveClass(); // Remove active class from all buttons
        clickedButton.classList.add("btn-active");
      // Handle the fetched data for the specific lesson
      displayShowLesson(data.data);
    });
}

const showInfoModal = (id) => {
    // alert(`You clicked on info for ID ${id}`);
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data for the specific vocabulary
            console.log(data.data); // Check the structure of the fetched data in the console
            // You can create and display a modal here using the fetched data
            displayVocabularyInfo(data.data);
        });
}
const displayVocabularyInfo = (vocabInfo) => {
    console.log(vocabInfo);
    // Create a modal element
    // const modal = document.getElementById("info-modal");
    // Populate the modal with vocabulary information
     const modalContent = document.getElementById("modal-content");
    
    modalContent.innerHTML = `
   
        <h3 class="font-bold text-lg">${vocabInfo.word}</h3>
        <p class="py-0 font-bold">Meaning:</p> ${vocabInfo.meaning}
        <p class="py-1">Pronunciation:</p> ${vocabInfo.pronunciation}
        <p> Example <br></p>
        <p> ${vocabInfo.sentence}</p>
        <div class="">
         <h2 class="font-bold text-xl">Synonyms</h2>
        ${vocabInfo.synonyms.map(synonym => `<button class="btn btn-sm btn-ghost m-1">${synonym}</button>`).join('')}
        ${vocabInfo.synonyms.length === 0 ? "<p>No synonyms available</p>" : ""}
        </div>

        
        
    

    `;
     document.getElementById("info_modal").showModal();
}
const displayShowLesson = (showAll) => {
    const lessonContainer = document.getElementById("lesson-container");
   
    
    lessonContainer.innerHTML = ""; // Clear previous content
    if(!showAll || showAll.length === 0)
        {
             lessonContainer.innerHTML = ` <div class = "text-center col-span-full m-10 space-y-4 bg-gray-100 p-6 rounded-lg">
        <img class="mx-auto" src="./assets/alert-error.png" alt="Error">
       <h2 class="text-l font-semibold font-bangla">এখনও কোনো লেসন যোগ করা হয়নি। <br></h2>
       <p class="text-2xl font-bold text-center font-bangla">একটি Lesson Select করুন।</p>
       </div>
       `;
       manageLoadingSpinner(false);
        return; // Exit if there's no data to display
        }
       
    
    for (const show of showAll)
    { 
        
        
        const lessonDiv = document.createElement("div");
       
       lessonDiv.innerHTML = `
<div class="p-10 text-center space-y-3 bg-gray-100 rounded-lg shadow-md m-5">

<div>
<h2 class="text-2xl font-bold">
${show.word ? show.word : "শব্দ পাওয়া যায়নি"}
</h2>

<p class="text-xl font-semibold">Meaning/Pronunciation</p>

<p class="font-semibold font-bangla">
${show.meaning ? show.meaning :"অর্থ পাওয়া যায়নি"} /
${show.pronunciation ? show.pronunciation :"উচ্চারণ পাওয়া যায়নি"}
</p>
</div>

<div class="flex justify-between items-center mt-4">

<button onclick="showInfoModal(${show.id})" class="btn btn-ghost">
<i class="fa-solid fa-circle-info"></i>
</button>

<button onclick="pronounceWord('${show.word ? show.word : ""}')" class="btn btn-ghost">
<i class="fa-solid fa-volume-high"></i>
</button>

</div>

</div>
`;

         lessonContainer.appendChild(lessonDiv);
    }
        manageLoadingSpinner(false);
}
loadLessons();
document.getElementById("submit-search-btn").addEventListener("click", function() {
    removeActiveClass();
    const searchInput = document.getElementById("search").value.trim().toLowerCase();
    console.log(searchInput);
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(response => response.json())
        .then(data => {
            const allWords = data.data;
            const filteredWords = allWords.filter(word => word.word.toLowerCase().includes(searchInput));
            displayShowLesson(filteredWords);
        });
});
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
