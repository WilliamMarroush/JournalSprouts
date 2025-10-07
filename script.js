let journalEntries = [];
function entryRecord(){
    var enTitle = document.getElementById("EntryName").value;
    var enContent = document.getElementById("EntryContent").value;
    var entryDate = new Date();
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
        //main entry data
        var entryTitle = document.createTextNode(journalEntries[i].title);
        var entryContent = document.createTextNode(journalEntries[i].content);

        //all required DOM elements
        var titleh1 = document.createElement("h1");
        var contentp = document.createElement("p");
        var titleDiv = document.createElement("div");
        var contentDiv = document.createElement("div");
        var listbox = document.createElement("li");

        //Attatching all elements together properly
        titleh1.appendChild(entryTitle);
        contentp.appendChild(entryContent);
        titleDiv.classList.add("Title");
        contentDiv.classList.add("Content")
        titleDiv.appendChild(titleh1);
        contentDiv.appendChild(contentp);
        listbox.appendChild(titleDiv);
        listbox.appendChild(contentDiv);

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
