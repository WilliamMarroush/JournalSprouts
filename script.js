/*#####GLOBAL STATE#####*/
let journalEntries = [];
let viewstate = true;
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
        var datepart1 = new Date().toLocaleDateString();
        var datepart2 = new Date().toLocaleTimeString();
        var entryDate = datepart1+ " " + datepart2;
        const journalEntry = {title:enTitle,content:enContent,date:entryDate};
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
        <div class="Timestamp"><small>${journalEntries[i].date}</small></div>
        `;
        listbox.classList.add("journalEntry");
        //Finally adding the list item to the garden
        elJournal.appendChild(listbox);
    }
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
    elEntryTitle.focus();
}
function streakCheck(){ 
    //first implement check to see if there were any entries today 
    document.getElementById("streak").innerHTML= 'Streak:${streak}'; 
    if (journalEntries.length < 2) return; 
    //if yes, don't bother checking as this only needs to run once per day 
    let lastRecordedEntry = journalEntries[journalEntries.length-2]; 
    let checkEntry = journalEntries[journalEntries.length-1]; 
    var currentDate = new Date().toISOString().split("T")[0]; 
    if (lastRecordedEntry.date == currentDate){ 
        //Checking if the second to last entry is from today. 
        //If so, skip this, because we already must have run it 
        return; 
    } 
    //Second, check the previous entry on the list, before the first entry of today 
    const diffDays = (new Date(checkEntry.date) - new Date(lastRecordedEntry.date)) / (1000*60*60*24); 
    //If there is only one days difference (hours don't matter) between last recorded entry and todays 
    //first entry, add one to streak 
    if (diffDays === 1){
         streak+=1; 
    } 
    else{
         streak=1; alert("You just started a new streak!"); 
    } 
} 
