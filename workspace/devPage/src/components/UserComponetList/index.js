import React from "react"

function userComponetList({componetList = [], onSelect = f=>f}) {
    return <div style={{cursor: "pointer"}}>{
        componetList.map((com, index) => <div
            key={index} 
            onClick={() => onSelect(com)}>
                {com.name}
            </div>)
    }</div>
};



export default userComponetList