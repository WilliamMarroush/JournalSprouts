function newEntry() {
    //Create a li element
    var listelement = document.createElement("li");
    //Get the text-box user input
    var inputValue = document.getElementById("EntryContent").value;
    //create and attatch the text element to the list element
    var textval = document.createTextNode(inputValue);
    listelement.appendChild(textval);


    if (inputValue == ""){
        alert("You gotta journal!");
        //If the user just hits the button
    }
    else {
        document.getElementById("garden").appendChild(listelement);
        //Add the user's input to the garden!
    }
    //clear the textbox
    document.getElementById("EntryContent").value = "";
}

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
