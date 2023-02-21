const nodeMailer = require('nodemailer');


//Email Sender Information
const email = "jdog012999@gmail.com";
const password = "uqvgbqllxgjuzjdv";
const service = "gmail";

//TurtleCreek's email
const reciever = "jdog012999@gmail.com";

//Creating the sender variable by auth user
const sender = nodeMailer.createTransport({
    service: service,
    auth: {
        user: email,
        pass: password
    }
});


//Pre: accepts string and object string 
//Post: Throws Error if anything is wrong, otherwise, send email to owner
//Description: Sends a email to the owner with the page the form is from as well as the email text
exports.sendInformation = (subject, data) => {
    try {
        let mail = {
            from: email,
            to: reciever,
            subject: subject,
            text: data
        };
        sender.sendMail(mail, (error, info) => {
            if(error) {
                throw error;
            }
            console.log("email sent!")
        });
    } catch(error) {
        throw error;
    }
};

