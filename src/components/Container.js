import React from "react";


function Container({className="", paddingY, children}) {
  
    return (
        <div className={`${className} h-full w-full xl:container mx-auto px-12 lg:px-40 ${paddingY ? 'py-28' : ''}`}>
            {children}
        </div>
    );
    
}

export default Container