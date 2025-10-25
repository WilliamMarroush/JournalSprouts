/*#####GLOBAL STATE#####*/
let journalEntries = [];
let garden = [];
let viewstate = true;
let streak=0;
let elEntryTitle,elEntryContent,elJournal,elJournalDiv,elGardenDiv;

/*######GARDEN CLASSES#####*/
//Multiple classes for each different journaling type? Have users choose different plants? idk
class Plant{
    constructor(date){
        this.date = date;
        this.growthStage = 0;
        this.witherCount = 0;
    }
    grow(){
        this.growthStage++;
    }
    wither(){
        this.witherCount++;
    }
}


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
        //creating the actual journalEntry object
        const journalEntry = {title:enTitle,content:enContent,date:entryDate,timestamp:timeStamp};
        journalEntries.push(journalEntry);
    }
}

/*#####RENDER FUNCTIONS#####*/
//Input for renderJournal: entirety of journalEntry array
//output for renderJournal: HTML dom output, giving each journal entry
//it's own little card.
function renderJournal(){
    //clearing Journal elements before displaying (to avoid repeating entries)
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
        gardenStatus();
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
//Function to go here: saveGarden()
//Input for saveGarden(): current state of all plant objects in garden array
//Output for saveGarden(): push garden array into localStorage JSON "garden"
function saveGarden(){

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
    //Zero, check if the journalEntries array is empty, if yes, streak=0
    if (journalEntries.length<1){
        streak=0;
        return;
    }

    //First, cycle through the entire journalEntries array, and extract only dates
    const msToDays = (1000 * 60 * 60 * 24);
    let messyDateList = new Set();
    for (var i=0; i<journalEntries.length;i++){
        messyDateList.add(journalEntries[i].date);
    }

    //First+1/2 turn dateList into dates again?
    let dateList = [...messyDateList].map(d => new Date(d));

    //Second, cycle through dates, and work on streak. If streak is continuous, let it persist
    //otherwise, streak goes to 0
    streak=1;
    for (var i=1;i<dateList.length;i++){
        if (((dateList[i]-dateList[i-1])/msToDays) == 1){
            streak+=1;
        }
        else{
            streak=0;
        }
    }
}
function gardenStatus(){
    let plantIcon = document.getElementById("gardenPlant");
    let caption = document.getElementById("encouragement");
    if (streak>20){
        caption.innerText = "Great job! 20+! your garden is flourishing";
        plantIcon.src = "./gardenIcons/seed.png";
    }
    else if (streak>10){
        caption.innerText = "Keep it up! Your garden is doing great!";
        plantIcon.src = "./gardenIcons/seed.png";
    }
    else if (streak>5){
        caption.innerText = "Your garden is starting to take up! ";
        plantIcon.src = "./gardenIcons/treeling.png";
    }
    else if (streak>=3){
        caption.innerText = "Keep watering your garden, and your saplings will grow!";
        plantIcon.src = "./gardenIcons/sapling.png";
    }
    else if(streak<3 && streak>=1){
        caption.innerText = "You've planted a new seed! Journal daily to watch it grow!";
        plantIcon.src = "./gardenIcons/sprout.png";
    }
    else{
        //Empty plot
        caption.innerText = "Get your garden started by adding a new Journal entry!";
        plantIcon.src = "";
    }
}
