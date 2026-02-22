

import React from 'react'

const Title = ({title , subtitle , align , font}) => {
  return (
    <div className={`flex flex-col text-center items-center justify-center ${align === 'left' && "md:text-left md:items-start"}`}>
        <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>
            {title}

        </h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174" >
             {subtitle}
        </p>
      
    </div>
  )
}

export default Title
