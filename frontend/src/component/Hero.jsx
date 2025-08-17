import React from 'react';

function Hero({ heroData }) {
  // Data check
  if (!heroData) {
    return <div className='text-white text-center p-4'>No Hero Data Available</div>;
  }

  return (
    <div className='w-[50%] h-[100%] relative'>
      <div className='absolute text-[#88d9ee] text-[20px] md:text-[40px] lg:text-[55px] md:left-[10%] md:top-[90px] lg:top-[130px] left-[10%] top-[10px]'>
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
    </div>
  );
}

export default Hero;
