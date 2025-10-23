/*#####GLOBAL STATE#####*/
let journalEntries = [];
let viewstate = true;
let streak=0;
let elEntryTitle,elEntryContent,elJournal,elJournalDiv,elGardenDiv;

/*#####INITIALIZATION#####*/
//This is gonna run as soon as the page starts,
//anything you want done on startup should go here
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
//Input for createJournalEntry (Technically): enTitle, enContent
//Output for createJournalEntry: New JournalEntry Object, pushed onto 
//journalEntries array
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
//Input for renderJournal: entirety of journalEntry array
//output for renderJournal: HTML dom output, giving each journal entry
//it's own little card.
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
//Input for updateEntryCount: journalEntries array
//output for updateEntryCount: updating the entry count variable
function updateEntryCount(){
    var entCount = document.getElementById("entryCount");
    entCount.innerHTML = `
    <p>Journal Entries: ${journalEntries.length}</p>
    `;
}
//Input for toggleView: which view to toggle to
//output for toggleView: Change which div has "hidden" class
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
//Input for saveJournal: entire journalEntries array
//output for saveJournal: None technically // pushing JSON string of
//journalEntries array to localStorage
function saveJournal(){
    localStorage.setItem("Journal", JSON.stringify(journalEntries));
}
//Input for loadSavedJournal: JSON for "Journal" from localStorage
//output for loadSavedJournal: updating journalEntries array to have
//all current and previously saved entries
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
//input for clearJournal: confirmation (Do you really want to delete your journal?)
//output for clearJournal: 
//                         if yes: clears journalEntries array, and clears saved journalEntries array
//                         if no: nothing
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
//input for addNewEntry: Title and Content of input textboxes
//output for addNewEntry: creates new JournalEntry object, and push it onto journalList. Save journal
//in localStorage
function addNewEntry(){
    createJournalEntry();
    renderJournal();
    updateEntryCount();
    saveJournal();
    calculateStreak();
    elEntryTitle.focus();
}
//Input for calculateStreak: Entire journalEntries array
//output for calculateStreak: single number, streak. Number of sequential days in a row a journal
//entry has been made
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
