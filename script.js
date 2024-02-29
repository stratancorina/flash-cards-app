let contentArray = JSON.parse(localStorage.getItem("items")) || [];

const mainContent = document.getElementById("main-content")
function createFlashcardElement(questionText, answerText, index) {
  const flashcard = document.createElement("div");
  flashcard.className = "flashcard";

  const question = document.createElement("div");
  question.setAttribute("style", "padding: 20px; display: flex; height: 100%");
  question.className = "question";
  question.textContent = questionText;

  const answer = document.createElement("div");
  answer.setAttribute("style", "text-align:center; display:none; height: 100%");
  answer.className = "answer";

  answer.textContent = answerText;

  const del = document.createElement("button");
  //   del.textContent = "<i class="fas fa-trash-alt"></i>";
  del.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="4" y1="7" x2="20" y2="7" />
  <line x1="10" y1="11" x2="10" y2="17" />
  <line x1="14" y1="11" x2="14" y2="17" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>`;
  del.className = "delete-btn tertiary";
  del.addEventListener("click", () => {
    deleteFlashcard(index);
  });

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    toggleAnswerDisplay(answer, question);
  });

  return flashcard;
}
function deleteFlashcard(index) {
  contentArray.splice(index, 1);

  if (contentArray.length === 0) {
    updateLocalStorageAndReload();
  } else {
    const flashcardsContainer = document.querySelector("#flashcards");
    flashcardsContainer.removeChild(flashcardsContainer.children[index]);
    updateLocalStorageAndReload();
  }
}
function toggleAnswerDisplay(answerElement, questionElement) {
  answerElement.style.display =
    answerElement.style.display === "none" ? "flex" : "none";
  questionElement.style.display =
    questionElement.style.display === "flex" ? "none" : "flex";
}

function updateLocalStorageAndReload() {
  localStorage.setItem("items", JSON.stringify(contentArray));
  location.reload();
}

function addFlashcard() {
  const questionInput = document.querySelector("#question");
  const answerInput = document.querySelector("#answer");

  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (question === "" || answer === "") {
    alert("Please fill out both question and answer fields.");
    return;
  }

  contentArray.push({ my_question: question, my_answer: answer });
  updateLocalStorageAndReload();

  questionInput.value = "";
  answerInput.value = "";
}

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
  updateBackgroundImageVisibility();
});
document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  document.getElementById("flashcards").innerHTML = "";
  contentArray = [];
  updateBackgroundImageVisibility();
});
document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("modal").style.display = "flex";
});
document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

const flashcardsContainer = document.querySelector("#flashcards");
contentArray.forEach((flashcard, index) => {
  const { my_question, my_answer } = flashcard;
  flashcardsContainer.appendChild(
    createFlashcardElement(my_question, my_answer, index)
  );
});

function updateBackgroundImageVisibility() {
    const background = document.querySelector(".background-image");
    
    if (!background) {
      if (contentArray.length === 0) {
        const background = document.createElement("div");
        background.classList = "background-image";
        const image = document.createElement("img");
        image.src = "papers.png"; 
        image.alt = "backround-man";
        background.appendChild(image);
        mainContent.appendChild(background);
      }
    } else {
      if (contentArray.length > 0) {
        mainContent.removeChild(background);
      }
    }
  }

updateBackgroundImageVisibility();
