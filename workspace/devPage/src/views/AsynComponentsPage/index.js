import React, {useEffect, useState} from "react"
// import Button from "Button/dist/Button.umd"
import AsynRenderList from "../../components/AsynRender"
import UserComponetList from "../../components/UserComponetList"
import "./index.css"


const AsynComponentsPage = () => {
    const [userComponetList, setUserComponetList] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:4000/complist')
        .then(response => response.json())
        .then(res => 
            setUserComponetList(res)
        )
    }, []);

    const [userSelectedComponetList, setSelectedComponetList] = useState([]);

    function onSelectComponent(comp, index) {
        const compindex = userSelectedComponetList.findIndex(({id}) => id === comp.id)

        if (!~compindex) {
            let list = [...userSelectedComponetList, {
                ...comp,
                componentUrl: comp.path
            }];
    
            setSelectedComponetList(list);
        }
        
    };
    const saveConfig = () => {
        fetch("http://localhost:4000/save/config", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(userSelectedComponetList), // data can be `string` or {object}!
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(res => res.json())
          .then(res => {
              console.log(res)
          })
          .catch(error => console.error('Error:', error))
    };

    return (
        <>
        <div>
            <button onClick={saveConfig}>save config</button>
        </div>
        <div className="async-page">
            <div className="async-page-col">
                
                选择组件
                <UserComponetList componetList={userComponetList} onSelect={onSelectComponent}/>
            </div>
            <div className="async-page-col">
                展示组件
                <div> 
                    <AsynRenderList componetList={userSelectedComponetList} />
                </div>
            </div>
            <div className="async-page-col">
                组件配置项
                <div> 
                    <AsynRenderList componetList={userSelectedComponetList} />
                </div>
            </div>
        </div>
        </>
    )
}

export default AsynComponentsPage;