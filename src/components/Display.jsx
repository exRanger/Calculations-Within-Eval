import React, { useEffect, useRef } from 'react'

export const Display = ({value}) => {

    let valueRef = useRef()
    
    useEffect( () => {
        valueRef.current.value = value
    }, [value])
        
    return (
        <div className="calculator__display">
           <input ref={valueRef} className="calculator__output" type="text" placeholder="0" readOnly/>
        </div>
    )
}

export default Display