'use client'
import React from 'react';

interface UnderConstructionProps {
  bgColor: string;
  textColor: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({bgColor, textColor}) => {
  return (
      <div className={`flex justify-center box-border p-8 ${bgColor} ${textColor}`}>
          <div className="flex-col text-center">
            <div className='w-80 p-8 mx-8 outline outline-yellow-300 bg-black text-yellow-300 font-bold text-5xl rounded-t-2xl'>
              CAUTION
            </div>
            <div className='w-80 p-8 mx-8 outline outline-yellow-300 bg-yellow-300 text-black font-bold text-3xl rounded-b-2xl'>
              AREA UNDER<br/>
              CONSTRUCTION<br/>
            </div>
        </div>
      </div>
  );
};

export default UnderConstruction;