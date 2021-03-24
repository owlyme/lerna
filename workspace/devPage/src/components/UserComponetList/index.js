import React from "react"

function userComponetList({componetList = [], onSelect = f=>f}) {
    return <div style={{cursor: "pointer"}}>{
        componetList.map((com, index) => <div 
            key={com.id} 
            onClick={() => onSelect(com)}>
                {com.name}
            </div>)
    }</div>
};



export default userComponetList