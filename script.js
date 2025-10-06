function newEntry(){
    //Create the Journal Entry elements
    var entryli = document.createElement("li");
    var entrybox = document.createElement("div");

    var entitle = document.getElementById("EntryName").value;
    var encontent = document.getElementById("EntryContent").value;
    //Get the text-box inputs
    var entrytitle = document.createTextNode(document.getElementById("EntryName").value);
    var entrycontent = document.createTextNode(document.getElementById("EntryContent").value);
    //Attatch text elements to the div, then div to the li
    entrybox.appendChild(entrytitle);
    entrybox.appendChild(entrycontent);
    entryli.appendChild(entrybox);
    if (entitle == ""){
        alert("Give your entry a name!");
        //If the user just hits the button
    }
    else if (encontent == ""){
        alert("Fill in your journal entry!")
    }
    else {
        document.getElementById("garden").appendChild(entryli);
        //Add the user's input to the garden!
    }
    //clear the textbox
    document.getElementById("EntryName").value = "";
    document.getElementById("EntryContent").value = "";
    
}
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("EntryContent").addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        e.preventDefault();
        document.getElementById("submitEntry").click();
    }
});
});
