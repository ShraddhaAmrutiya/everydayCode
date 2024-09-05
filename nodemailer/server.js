const express=require('express');
const nodemailer=require('nodemailer');
require('dotenv').config();

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

})
// Serve HTML contact form
// if you use postman no need to use this get request
app.get('/', (req, res) => {
    res.send(`
        <form action="/contact" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send</button>
        </form>
    `);
});
app.post('/contact',(req,res)=>{
    const{name, email,message}=req.body;
    
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:process.env.EMAIL_TO,
        subject:`Contact from submission from ${process.env.EMAIL_USER}`,
        text:`Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    }
  
    transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            return res.status(500).send('error sending email')
        }
        res.send('email send successfully')
    });
})

app.listen(3000,()=>console.log('server is running on port 3000')
)