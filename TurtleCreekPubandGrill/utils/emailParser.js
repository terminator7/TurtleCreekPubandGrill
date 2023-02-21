

//Pre: Takes in object
//Post: returns a string of the object
//Description: Converts object data into string for email send
exports.convertEmailData = (emailData) => {
    let stringData = "";
    for(const property in emailData) {
        stringData += `${property}: ${emailData[property]}` + '\n';
    }
    return stringData
};