function newEntry(){
    //Getting the text data to work with
    var entryTitle = document.createTextNode(document.getElementById("EntryName").value);
    var entryContent = document.createTextNode(document.getElementById("EntryContent").value);
    var entryDate = new Date();

    //Creating the layout for how it will look
    /*
        <li>
            <div class = "Title"
                <h3>entryTitle.value</h3>
            </div>
            <div class = "Content">
                <p>entryContent.value<p>
            </div>
        </li>
    */
    var titleh1 = document.createElement("h1");
    var contentp = document.createElement("p");
    var titleDiv = document.createElement("div");
    var contentDiv = document.createElement("div");
    var listbox = document.createElement("li");

    //Now we just as a child
    titleh1.appendChild(entryTitle);
    contentp.appendChild(entryContent);
    titleDiv.classList.add("Title");
    contentDiv.classList.add("Content")
    titleDiv.appendChild(titleh1);
    contentDiv.appendChild(contentp);
    listbox.appendChild(titleDiv);
    listbox.appendChild(contentDiv);

    if (entryTitle == ""){
        alert("Give your entry a name!");
    }
    else if (entryContent == ""){
        alert("Fill in your journal entry!")
    }
    else{
        document.getElementById("garden").appendChild(listbox);
    }

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
