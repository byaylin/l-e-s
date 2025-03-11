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
        user: process.env.EMAIL,  // Your email
        pass: process.env.PASSWORD // App password (not your regular password)
    }
});

app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: process.env.EMAIL, // Your email (where you want to receive messages)
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Error sending email");
        }
        console.log("Email sent:", info.response);
        res.send("Email sent successfully!");
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
