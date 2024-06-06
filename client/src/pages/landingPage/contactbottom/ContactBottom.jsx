import React, {useState} from 'react'
import axios from 'axios';

import './ContactBottom.css'

const ContactBottom = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendMesaage = async() => {     
    try{
      const apipath = '';
      const response = await axios.post(apipath, 
      {
          name:name,
          email: email,
          phoneNo: phoneNo,
          message: message,
      })
      setStatus(response.data.message);
      setName('');
      setEmail('');
      setPhoneNo('');
      setMessage('');
    }
    catch(error){
      console.log(error.message);
  }
  }
  return (
    <div className='homepage_contact_bottom' id='contacts'>
        <div className='homepage_contact_bottomBox'>
          <div className='homepage_contact_bottom_imageBox'>
            <img src='/landingPage/contacts/4-min.png' />
          </div>
          <div className='homepage_contact_bottom_form'>
            <h1>Contact Us</h1>
            <p>Get in touch with our team. let's start the conversation</p>
            <div className='homepage_contact_bottom_form_inputs'>
              <input type="text" placeholder='Name' value={name} onChange={(event) => {setName(event.target.value);}} />
              <input type="email" placeholder='Email' value={email} onChange={(event) => {setEmail(event.target.value);}} />
              <input type="number" placeholder='Phone No' value={phoneNo} onChange={(event) => {setPhoneNo(event.target.value);}}/>
            </div>
            <textarea placeholder='Write your message' value={message} onChange={(event) => {setMessage(event.target.value);}} />
            
            <button onClick={()=>sendMesaage()}>Submit</button>
            <h2 className={status == 'Contact email sent successfully' ? 'homepage_contact_bottom_form_inputs-h2' : 'homepage_contact_bottom_form_inputs-h2-p'}>{status}</h2>
          </div>
        </div>
    </div>
  )
}

export default ContactBottom