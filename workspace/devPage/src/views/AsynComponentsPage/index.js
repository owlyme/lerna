import React, {useEffect, useState} from "react"
import Button from "Button/src/index"
import AsynRenderList from "../../components/AsynRender"
import UserComponetList from "../../components/UserComponetList"


import "./index.css"

function fakeFetch(cb, delay = 1000) {
    setTimeout(() =>{
        cb()
    }, delay) 
}

let USER_COMPONENTS_LIST = [
    {
        id: 1,
        name: "A1",
        componentUrl: "/js/A1.umd.js",
        editorUrl: ""
    },
    {
        id: 2,
        name: "A2",
        componentUrl: "/js/A2.umd.js",
        editorUrl: ""
    }
]

const AsynComponentsPage = () => {
    const [userComponetList, setUserComponetList] = useState([]);
    
    useEffect(() => {
        fakeFetch(() =>{
            setUserComponetList(USER_COMPONENTS_LIST)
        }) 
    }, []);

    const [userSelectedComponetList, setSelectedComponetList] = useState([]);

    function onSelectComponent(comp, index) {
        let list = [...userSelectedComponetList, comp];

        console.log(list);
        setSelectedComponetList(list);
    };

    return (
        <div className="async-page">
            <div className="async-page-col">
                <Button />
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
    )
}

export default AsynComponentsPage;