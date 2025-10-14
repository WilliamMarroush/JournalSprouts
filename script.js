/*#####GLOBAL STATE#####*/
let journalEntries = [];
let viewstate = true;
let streak=0;
let elEntryTitle,elEntryContent,elJournal,elJournalDiv,elGardenDiv;

/*#####INITIALIZATION#####*/
document.addEventListener("DOMContentLoaded",function(){
    elEntryTitle = document.getElementById("EntryName");
    elEntryContent = document.getElementById("EntryContent");
    elJournal = document.getElementById("journal");
    elJournalDiv = document.getElementById("journalDiv");
    elGardenDiv = document.getElementById("gardenDiv");
    loadSavedJournal();

    elEntryContent.addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        e.preventDefault();
        document.getElementById("submitEntry").click();
    }
    });
});

/*#####DATA FUNCTIONS#####*/
function createJournalEntry(){
    var enTitle = elEntryTitle.value;
    var enContent = elEntryContent.value;
    if (enTitle == "" || enContent == ""){
        alert("Entries must have content and title.")
        return;
    }
    //create a journalEntry element, and push it onto the array
    else{
        var entryDate = new Date().toISOString().split("T")[0];
        var timeStamp = new Date().toLocaleTimeString();
        const journalEntry = {title:enTitle,content:enContent,date:entryDate,timestamp:timeStamp};
        journalEntries.push(journalEntry);
    }
}

/*#####RENDER FUNCTIONS#####*/
function renderJournal(){
    //clearing garden elements before displaying (to avoid repeating entries)
    elJournal.replaceChildren();
    for (let i=0;i<journalEntries.length;i++){
        var listbox = document.createElement("li");
        listbox.innerHTML = `
        <div class="Title"><h2>${journalEntries[i].title}</h2></div>
        <div class="Content"><p>${journalEntries[i].content}</p></div>
        <div class="Datestamp"><small>${journalEntries[i].date}</small></div>
        <div class="Timestamp"><small>${journalEntries[i].timestamp}</small></div>
        `;
        listbox.classList.add("journalEntry");
        //Finally adding the list item to the garden
        elJournal.appendChild(listbox);
    }
    //rendering streak element
    document.getElementById("streakCount").innerHTML = `Streak: ${streak}`;

    //clearing out the textboxes
    elEntryTitle.value = "";
    elEntryContent.value = "";
}
function updateEntryCount(){
    var entCount = document.getElementById("entryCount");
    entCount.innerHTML = `
    <p>Journal Entries: ${journalEntries.length}</p>
    `;
}
function toggleView(option){
    if (option == 'journal'){
        elJournalDiv.classList.remove("hidden");
        elGardenDiv.classList.add("hidden");
    }
    else{
        elJournalDiv.classList.add("hidden");
        elGardenDiv.classList.remove("hidden");
    }
}
/*#####STORAGE FUNCTIONS#####*/
function saveJournal(){
    localStorage.setItem("Journal", JSON.stringify(journalEntries));
}
function loadSavedJournal(){
    let tempJournal = JSON.parse(localStorage.getItem("Journal"));
    if (tempJournal && Array.isArray(tempJournal)){
        journalEntries = tempJournal;
        calculateStreak();
        renderJournal();
        updateEntryCount();
    } else {
        alert("No saved journal found!");
    }
}

/*#####EVENT HANDLER FUNCTIONS#####*/
function clearJournal(){
    if (confirm("Are you sure?")){
        journalEntries = [];
        saveJournal();
        calculateStreak();
        renderJournal();
        updateEntryCount();
    }
    else{
        alert("Journal was not deleted.");
    }  
}
function addNewEntry(){
    createJournalEntry();
    renderJournal();
    updateEntryCount();
    saveJournal();
    calculateStreak();
    elEntryTitle.focus();
}
function calculateStreak(){
    //extract all unique date values from journalEntries array
    let datestamps = journalEntries.map(entry => entry.date);
    let uniqueDates = [...new Set(datestamps)];
    uniqueDates.sort();

    if (uniqueDates.length === 0){
        streak=0;
        return;
    }
    if (uniqueDates.length === 1){
        let today = new Date().toISOString().split("T")[0];
        if(uniqueDates[0] == today){
            streak = 1;
        }
        else{
            streak =0;
        }
        return;
    }

    for (var i=0;i<uniqueDates.length;i++){
        uniqueDates[i] = new Date(uniqueDates[i]);
    }

    streak=1;
    for (var i = uniqueDates.length-1;i>=1;i++){
        let current = uniqueDates[i];
        let previous = uniqueDates[i-1];
        let difference = (current - previous)/ (1000 * 60 * 60 * 24);

        if (Math.abs(difference - 1) < 0.01){
            streak+=1;
        }
        else{
            break;
        }

    }
    let today = new Date().toISOString().split("T")[0];
    let latestDate = uniqueDates[uniqueDates.length - 1].toISOString().split("T")[0];
    if (latestDate !== today){
        streak=0;
    }
    return;

}
