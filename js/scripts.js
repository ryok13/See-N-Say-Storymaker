// Get words under each column's images
function getWords(id) {
    const container = document.getElementById(id);
    const words = [];
    const elements = container.querySelectorAll("img + p");
    elements.forEach(p => {
        let text = p.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
        words.push(text);
    });
    return words;
}

// Extract words for each column using the getWords function
const subjects = getWords("column1-words");
const verbs = getWords("column2-words");
const adjectives = getWords("column3-words");
const nouns = getWords("column4-words");
const places = getWords("column5-words");

// Create a random story using 1 word from each column
function generateStory() {
    const part1 = subjects[Math.floor(Math.random() * subjects.length)];
    const part2 = verbs[Math.floor(Math.random() * verbs.length)];
    const part3 = adjectives[Math.floor(Math.random() * adjectives.length)];
    const part4 = nouns[Math.floor(Math.random() * nouns.length)];
    const part5 = places[Math.floor(Math.random() * places.length)];

    return `${part1} ${part2} ${part3} ${part4} ${part5}`;
}

// Setup speech synthesis
let synth = window.speechSynthesis;
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.6;
    synth.cancel();
    synth.speak(utterance);
}

// Read one word at a time from a given list
function speakOneWord(words) {
    let index = 0;
    return function() {
        speak(words[index]);
        index++;
        if (index >= words.length) {
            index = 0;
        }
    };
}
document.getElementById("button1").addEventListener("click", speakOneWord(subjects));
document.getElementById("button2").addEventListener("click", speakOneWord(verbs));
document.getElementById("button3").addEventListener("click", speakOneWord(adjectives));
document.getElementById("button4").addEventListener("click", speakOneWord(nouns));
document.getElementById("button5").addEventListener("click", speakOneWord(places));

// Handle "Surprise" button – generate & speak a full random sentence
let newSentence = "";
document.getElementById("surpriseBtn").addEventListener("click", ()=> {
    newSentence = generateStory();
    document.getElementById("storyOutput").textContent = newSentence;
    speak(newSentence);
})

// Handle "Repeat" button – speak the previously generated sentence
document.getElementById("repeatBtn").addEventListener("click", ()=>{
    if(newSentence) {
        speak(newSentence);
    }
})
