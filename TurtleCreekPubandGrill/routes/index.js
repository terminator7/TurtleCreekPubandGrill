var express = require('express');
var router = express.Router();
var sendInformation = require('../utils/emailProvider');
var emailParser = require('../utils/emailParser');

const websiteName = 'Turtle Creek Pub and Grill';


//About Routers
router.get('/about' ,(req, res, next) => {
  res.render('aboutus', {title: websiteName});
});

//Contact Us Routers
router.get('/contact' ,(req, res, next) => {
  res.render('contact', {title: websiteName});
});

router.post('/contact', (req, res) => {
  try {
    sendInformation.sendInformation('contactPage', emailParser.convertEmailData(req.body));
  }
  catch(error) {
    //Do Something
  }
});

//Events Routers
router.get('/events', (req, res) => {
  res.render('events', {title: websiteName});
});

//Home Routers
router.get('/', (req, res) => {
  res.render('index', { title: websiteName });
});

//Catering Routers
router.get('/catering', (req, res) => {
  res.render('catering', {title: websiteName});
});

router.post('/catering', (req, res) => {
  try {
    emailString = emailParser.convertEmailData(req.body);
    console.log(req.body.spam);
    if(!emailString || !(req.body).hasOwnProperty('spam')) {
      res.status(200).send("Okay\n");
    } else {
      sendInformation.sendInformation('cateringPage', emailParser.convertEmailData(req.body));
      res.status(200).send('<p>The Message Was Sent!</p>');
    }
  }
  catch(error) {
    res.status(409).send('<p>There was a error sending your response, Please try again</p>')
  }
});

//Menu Routers
router.get('/menu', (req, res) => {
  res.render('menu', {title: websiteName});
});

module.exports = router;
