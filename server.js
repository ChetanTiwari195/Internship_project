// import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const cors = require('cors');

// set up express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cors middleware and allow all origins
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// set up MongoDB connection
mongoose
.connect(
  "mongodb+srv://1HK20CS040:YIgu2pLU1rHt5Cwo@cluster0.5frfhxa.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));

// define reservation schema and model
const reservationSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  persons: Number,
  date: Date,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

// set up Sendinblue
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi(); // Change made here

// define reservation route
app.post("/reservation", async (req, res) => {
  let reservation = new Reservation({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    persons: req.body.persons,
    date: new Date(req.body.date),
  });

  try {
    // save reservation
    await reservation.save();

    // send confirmation email
    var sendSmtpEmail = {
      sender: { 
        name: "Dinner Reservation",
        email: "sweet56t@gmail.com"
      },
      to: [{
        email: reservation.email,
        name: reservation.name
      }],
      subject: "Reservation Confirmation",
      htmlContent: `<!DOCTYPE html> <html> <body>
        <p><h3>Thank you for your reservation, ${reservation.name}.</h3></p>
        <h5>Seates Booked: ${reservation.persons}</h5>
        <h5>On Date: ${reservation.date}</h5>
        </body> </html>`,
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('Email sent. Returned data: ' + JSON.stringify(data));
    }, function(error) {
      console.error(error);
    });

    // send success response
    res.status(200).json({ message: "Booking confirmed!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in booking. Please try again.");
  }
});
