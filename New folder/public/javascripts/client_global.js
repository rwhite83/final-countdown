/*SIGNUP PAGE*/

// Hide the first step/login inputs in header then reveal second step
showSecondStep = () =>{
    document.getElementById("navbar-login-inputs").classList.add("hidden");
    document.getElementById("signup-stepone").classList.add("hidden");
    document.getElementById("signup-steptwo").classList.remove("hidden")
}

/* HOME PAGE */

// Simply selects an option from dropdown control and replaces the dropdown text with selected item's text
selectTypeOfPost = (element, dropDownElementId) =>{
    let topicButton = document.getElementById(dropDownElementId);

    // Attach to signify that it has been clicked, just changes color
    topicButton.classList.add("home-content-input-topics.isclicked");
    
    // Now the type is stored as textContent in topic button
    topicButton.value = element.textContent;
}

/*QUESTIONS PAGE*/

// Unhides the replies under a question
showReplies = (element) =>{
    // Gets the parent containing the question (home-question-right) element and then gets all direct children
    let childrenOfQuestion = element.parentElement.parentElement.children;

    /* The decided structure for question will always have replies as the
     last child under the home-question-right element */
    let repliesBlock = childrenOfQuestion[childrenOfQuestion.length-1];

    // Toggle reveal or hide
    if(repliesBlock.classList.contains("hidden")){
        // Reveal replies block
        repliesBlock.classList.remove("hidden");
    } else{
        // Hide replies block
        repliesBlock.classList.add("hidden");
    }
}