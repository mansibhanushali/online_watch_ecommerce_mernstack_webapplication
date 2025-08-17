import React from 'react';
import Title from '../component/Title';
import contact from "../assets/contact.jpg";

function Contact() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] pt-20 pb-10 gap-12'>
      
      <Title text1="CONTACT" text2="US" />
      
      {/* Image */}
      <img
        src={contact}
        alt="contact"
        className='w-[80%] max-w-[500px] rounded-md shadow-lg shadow-black'
      />

      {/* Text Info */}
      <div className='text-center text-white space-y-4'>
        <div>
          <p className='font-bold text-lg'>Our Store</p>
          <p>Kalawad Road</p>
          <p>Rajkot, Gujrat, India</p>
        </div>

        <div>
          <p>Tel: +91-8866491889</p>
          <p>Email: wristwatchadmin@gmail.com</p>
        </div>

        <div>
          <p className='font-bold text-lg'>Careers at Wrist Watch</p>
          <p>Join our team to innovate the future of wrist watches.</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
