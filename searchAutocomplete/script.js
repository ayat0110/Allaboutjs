let suggestionWords = [
    "html",
    "css",
    "javascript",
    "jquery",
    "ajax",
    "react",
    "angular",
    "node js",
    "express js",
    "redux",
    "chart js",
    "bootstrap",
    "php",
    "yii",
    "laravel",
    "codigniter",
    "mysql",
    "mongo db",
    "asp .net",
    "java",
    "python",
    "django",
    "ruby",
    "c++",
    "webpack",
    "hammer js",
    "http",
    "server",
    "programming",
    "artificial inteligence",
    "development",
    "website",
    "app",
    "frontend",
    "backend",
    "cross platform",
    "xml",
    "api",
    "algorithm",
    "ssl",
    "enrypt",
    "decrypt",
    "code",
];

const suggestionListEl = document.getElementById("suggestionList");
const inputTextEl = document.getElementById("inputText");
const formEl = document.getElementById("form");
const sectionEl = document.getElementById("section");

let currentPosition = -1;

inputTextEl.addEventListener("input", searchSuggestions);
inputTextEl.addEventListener("click", createRecentSearchSuggestions);

formEl.addEventListener("submit", (e) => {
 e.preventDefault();
 if(inputTextEl.value.trim()) searchGoogle(inputTextEl.value);
});

// Suggestions are stored in localStorage for better Experience for user

class LocalStorage {
    constructor(LOCALSTORAGE_KEY) {
        this.local = localStorage.getItem(LOCALSTORAGE_KEY)
            ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
            : [];
        this.localKey = LOCALSTORAGE_KEY;
    }
    saveLocal(userSuggest) {
        if(!suggestionWords.includes(userSuggest)) {
            this.local.push(userSuggest);
            this.local = [...new Set(this.local)];
            this.stringfyLocal();
        }
    }
    deleteLocal(value) {
        this.local = this.local.filter((item) => item !== value);
        suggestionWords = suggestionWords.filter((item) => item !== value);
        this.stringfyLocal();
    }
    stringfyLocal() {
        localStorage.setItem(this.localKey, JSON.stringify(this.local));
    }
}

const localStorage = new LocalStorage("AutocompleteSuggestions");

if(localStorage.local.length)
 suggestionWords = [...suggestionWords, ...localStorage.local]

 function createSuggestionList(list, matchValue) {
    const liEl = document.createElement("li");
     const liLeft = document.createElement("div");
     liLeft.classList.add("liLeft");

     const launchIcon = document.createElement("span");
     launchIcon.classList.add("material-icons");
     launchIcon.innerHTML = `launch`;
     liLeft.append(launchIcon);

     const para = document.createElement("p");
     para.innerHtml = list.replace(matchValue, `<span>${matchValue}</span>`);
     liLeft.appendChild(para);

     liEl.appendChild(liLeft)
 }