function newEntry() {
    //Create a li element
    var listelement = document.createElement("li");
    //Get the text-box user input
    var inputValue = document.getElementById("journalentries").value;
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
    document.getElementById("journalentries").value = "";
}