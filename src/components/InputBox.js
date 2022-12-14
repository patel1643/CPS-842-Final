import React from 'react'

function InputBox({text, handleChange, className}) {
    return (
        <div>
            <label className="cursor-pointer label">
                <span className="">{text}</span> 
                <input type="checkbox" className={`w-6 h-6 mx-2 ${className}`} defaultChecked={false} onChange={() => handleChange()} />
            </label>
        </div>

    )
}

export default InputBox