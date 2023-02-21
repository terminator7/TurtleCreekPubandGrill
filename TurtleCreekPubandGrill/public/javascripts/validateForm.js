
//Pre: Accepts FORMDATA
//Post: returns object based on FORMDATA
//Description: Takes in a user's form data and converts it into a object
function convertFormData(data) {
    let object = {};
    data.forEach((value, key) => object[key] = value);
    return object;
}

//Pre: Accepts url(string) and data(object)
//Post: returns object with the http status and the corresponding text
//Description: Fetch data from server and return its response
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/html'
        },
        body: JSON.stringify(data)
    });
    let responseText = await response.text();
    return {status: response.status, text:responseText};
}


//Grabbing ness elements from the page (form and response displayMessage)
var form = document.querySelector('.needs-validation')
var displayMessage = document.getElementById('displayMessage');

//Adding an event listener to form to hear out for a submit event from button press
form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        console.log("Sucess");
        event.preventDefault();
        let formData = new FormData(form);
        postData(form.action, convertFormData(formData)).then(response => {
            if(response.status == 200) {
                displayMessage.classList.add('text-danger', 'text-center');
            } else {
                displayMessage.classList.add('text-center');
                displayMessage.style.color = "#bd0303";
            }
            displayMessage.innerHTML = response.text;

        }).catch(error => {
            console.log(error);
        });
    }

    form.classList.add('was-validated');
});