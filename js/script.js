/* background color on home page */
let back = document.getElementById("myDiv").style.backgroundColor;
document.getElementById("demo").innerHTML=back


var myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExample'), {
    interval: 2000, // Change slides every 2 seconds
    wrap: true
  });

  require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.aylinr850,  // Your email
        pass: process.env.leyrpwmyxfaphwpj// App Password (not regular email password)
    }
});

app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Error sending email");
        }
        res.send("Email sent successfully!");
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
