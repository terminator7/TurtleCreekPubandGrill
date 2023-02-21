
//Grabbing all elements from page
var dropDowns = document.querySelectorAll(".dropdown-item");
var menuSections = document.querySelectorAll(".menuSection")
var navBrand = document.getElementById("navBrand");
var menuBar = document.getElementById("menuBar");
var navBar = document.getElementById("navBarContainer");

//Grabbing the windowWidth and threshold of the screen size for dropdown activity
var windowWidth;
const threshold = 991.98;


function getDocHeight() {
    let D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}


//Pre: NA
//Post: Sets and removes attricbutes of menuBar
//Description: Will remove and add attributes to element based of the width of the screen
function resizeHandler() {
    windowWidth = window.innerWidth;

    if(windowWidth >= threshold) {
        menuBar.removeAttribute("data-bs-toggle");
    } else {
        menuBar.setAttribute("data-bs-toggle", "collapse");
    }
}


//Pre: takes in a HTML element
//Post: returns bool of elements view property
//Description: Detects to see if an element is in top view of the screen
function isInView(element) {
    const nextChild = element.firstChild.nextSibling;
    const rect = nextChild.getBoundingClientRect();
    const menuBarRect = menuBar.getBoundingClientRect();
    /* console.log(`Rec Top: ${rect["y"]}`);
    console.log(`Rec Bottom: ${rect.bottom}`);
    console.log(window.innerHeight - element.offsetHeight)
    console.log(element.offsetHeight);
    console.log(window.innerHeight);
    console.log(menuBarRect["bottom"]); */
    
    return (
        rect["top"] >= 0 &&
        rect["top"] <= menuBarRect["bottom"]
    );
}

//Pre: NA
//Post: Will add an "active" class to a tab and remove active from all other tabs
//Description: Allows tabs to be active when they are present in the view
function scrollHandler() {
    let body = document.body
    
    menuSections.forEach((section) => {
        if(isInView(section) || window.scrollTop+window.innerHeight === getDocHeight()) {
            let nextChild = section.firstChild.nextSibling;
            //console.log(nextChild);
            navBrand.textContent = nextChild.textContent;
            dropDowns.forEach((dropDown) => {
                if(dropDown.textContent === navBrand.textContent) {
                    dropDown.classList.add("active");
                } else{
                    dropDown.classList.remove("active");
                }
            });
        }
    });
}


//Main Running Code

//Adding EventListeners to handle scroll and resize
window.addEventListener("resize", resizeHandler);
document.addEventListener("scroll", scrollHandler);


//Removing attribute from menubar if it is a certain screen size
windowWidth = window.innerWidth;
if (windowWidth >= threshold) {
    menuBar.removeAttribute("data-bs-toggle");
}

//Grabbing each dropdown and setting the "active" tab if it is click and setting all other ones to inactive state
dropDowns.forEach((dropDown) => {
    dropDown.addEventListener('click', () => {
        navBrand.textContent = dropDown.textContent;
        dropDowns.forEach((dropDown) => {
            dropDown.classList.remove("active");
        });
        dropDown.classList.add("active");
        window.location.href = dropDown.getAttribute('href');
    });
});
