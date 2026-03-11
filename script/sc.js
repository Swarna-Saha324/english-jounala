// const UserData = () => {
//     const url = "https://openapi.programming-hero.com/api/levels/all";
//     fetch(url)
//         .then(response => response.json())
//         .then(json => displayUser(json))
//         .catch(err => console.error("Fetch error:", err));
// };

// const displayUser = (user) => {
//     console.log(user); // Look at your console; you'll see 'data' is the array
    
//     const levelsContainer = document.getElementById("level-container");
    
//     // Safety Check: If the HTML element is missing, stop here
//     if (!levelsContainer) {
//         console.error("Missing element with ID 'level-container' in your HTML!");
//         return;
//     }

//     levelsContainer.innerHTML = "";

//     // Use user.data because the API wraps the array inside a 'data' property
//     user.data.forEach(ele => {
//         const levelDiv = document.createElement("div");
        
//         levelDiv.innerHTML = `
//             <button onclick="showLesson(${ele.level_no})" class="btn btn-primary">
//                 <i class="fa-brands fa-leanpub"></i> Lesson ${ele.level_no}
//             </button>
//         `;

//         levelsContainer.appendChild(levelDiv);
//     });
// };
// const showLesson = (levelNo) => {
//     // alert(`You clicked on Lesson ${levelNo}`);
//         const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
//         // alert(`Fetching details for Lesson ${url}...`);
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 // Handle the fetched data for the specific lesson
//                displayShowLesson(data.data);
//             });
// };

// const displayShowLesson = (information) => {
//     const lessonContainer = document.getElementById("lesson-container");
//     lessonContainer.innerHTML = " "; // Clear previous content
//     if (!information || information.length === 0) {
//         lessonContainer.innerHTML = `
//         <div class = "text-center col-span-full m-10 space-y-4 bg-gray-100 p-6 rounded-lg">
//         <img class="mx-auto" src="./assets/alert-error.png" alt="Error">
//        <h2 class="text-l font-semibold font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।<br></h2>
//        <p class="text-2xl font-bold text-center font-bangla">নেক্সট Lesson এ যান</p>
//        </div>
//        `
//         return; // Exit if there's no information to display
//     }
//     information.forEach((element) => {
//         console.log(element); // Check the structure of each element in the console
//     const lessonDiv = document.createElement("div");
//     lessonDiv.innerHTML = `<div class ="p-10 text-center space-y-3 bg-gray-100 rounded-lg shadow-md m-5">
//        <div class="">
//         <h2 class= "text-2xl font-bold" >${element.word ? element.word : "Not FOUND"}
//         </h2>
//           <p class="text-xl font-semibold">Meaning/Prononciation</p>
//           <p class="font-semibold font-bangla">${element.meaning ? element.meaning :"Not Found"}/${element.pronunciation ? element.pronunciation :"Not Found"}</p>
//        </div>
//        <div class="flex justify-between">
//         <i class="fa-solid fa-circle-info"></i>
//         <i class="fa-solid fa-volume-high"></i>
//        </div>
//        </div>`;
//     lessonContainer.append(lessonDiv);
// }
//     )};
// UserData(); 

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
        <p class="py-4">Meaning: ${vocabInfo.meaning}</p>
        <p class="py-4">Pronunciation: ${vocabInfo.pronunciation}</p>
        <p> Example <br></p>
        <p> ${vocabInfo.sentence}</p>

        
        
    

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
       <h2 class="text-l font-semibold font-bangla">আপনি এখনো কোন Lesson Select করেন ন<br></h2>
       <p class="text-2xl font-bold text-center font-bangla">একটি Lesson Select করুন।</p>
       </div>
       `;
        return; // Exit if there's no data to display
        }
       
    
    for (const show of showAll)
    { 
        
        
        const lessonDiv = document.createElement("div");
       
        lessonDiv.innerHTML = `<div class ="p-10 text-center space-y-3 bg-gray-100 rounded-lg shadow-md m-5">
       <div class="">
        <h2 class= "text-2xl font-bold" >${show.word ? show.word : "শব্দ পাওয়া যায়নি"}
        </h2>
          <p class="text-xl font-semibold">Meaning/Prononciation</p>
          <p class="font-semibold font-bangla">${show.meaning ? show.meaning :"অর্থ পাওয়া যায়নি"}/${show.pronunciation ? show.pronunciation :"উচ্চারণ পাওয়া যায়নি"}</p>
       </div>
       <div class="flex justify-between">
      <button onclick="showInfoModal(${show.id})" class="btn btn-ghost">
        <i class="fa-solid fa-circle-info"></i>
      </button>
        <i class="fa-solid fa-volume-high"></i>
       </div>
       </div>`;

         lessonContainer.appendChild(lessonDiv);
    }
}
loadLessons();

