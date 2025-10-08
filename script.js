let journalEntries = [];
function entryRecord(){
    var enTitle = document.getElementById("EntryName").value;
    var enContent = document.getElementById("EntryContent").value;
    var datepart1 = new Date().toLocaleDateString();
    var datepart2 = new Date().toLocaleTimeString();
    var entryDate = datepart1+ " " + datepart2;
    if (enTitle == "" || enContent == ""){
        alert("Entries must have content and title.")
    }

    //create a journalEntry element, and push it onto the array
    else{
        const journalEntry = {title:enTitle,content:enContent,date:entryDate};
        journalEntries.push(journalEntry);
    }
}
function journalDisplay(){
    //clearing garden elements before displaying (to avoid repeating entries)
    document.getElementById("garden").replaceChildren();
    for (let i=0;i<journalEntries.length;i++){
        var listbox = document.createElement("li");
        listbox.innerHTML = `
        <div class="Title"><h2>${journalEntries[i].title}</h2></div>
        <div class="Content"><p>${journalEntries[i].content}</p></div>s
        <div class="Timestamp"><small>${journalEntries[i].date}</small></div>
        `;

        //Finally adding the list item to the garden
        document.getElementById("garden").appendChild(listbox);
    }
    //clearing out the textboxes
    document.getElementById("EntryName").value = "";
    document.getElementById("EntryContent").value = "";
}
function newEntry(){
    entryRecord();
    journalDisplay();
}
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("EntryContent").addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        e.preventDefault();
        document.getElementById("submitEntry").click();
    }
});
});
