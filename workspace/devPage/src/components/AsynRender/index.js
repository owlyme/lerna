import React, {useState, useEffect} from "react"

let scritpsMap = {};

function loadScript(url, componentName, cb =f=>f) {
    let scriptId = "scriptId-";
    window.React = React;

    let afterLoadedFn = () => {
        cb(window.WeiMob[componentName])
    }
    if (scritpsMap[url] && window.WeiMob && window.WeiMob[componentName]) {
        cb(window.WeiMob[componentName])
        return
    } else if (scritpsMap[url] && (!window.WeiMob || !window.WeiMob[componentName])) {
        scritpsMap[url].push(afterLoadedFn)
        return 
    }

    let s = document.createElement("SCRIPT");

    scriptId += Date.now();
    if (!scritpsMap[url]) {
        scritpsMap[url] = [afterLoadedFn]
    }

    s.onload = () => {
        scritpsMap[url].forEach(fn => fn())
    }
    s.setAttribute('id', scriptId);
    s.setAttribute('src', url);
    document.body.appendChild(s);
}

export const AsynRender = ({componetsUrl, componentName, ...others}) => {
    const [loaded, setLoadedState] = useState(false)
    const [AsyncComponent, setAsyncComponent] = useState("div")

    useEffect(() => {
        loadScript(componetsUrl, componentName, (Comp) => {
            setLoadedState(true);
            setAsyncComponent(
                <Comp text="a2a2" />
            )
        })
    }, [])  

    
    return (<>
       {
            loaded ? AsyncComponent : "loading"
        } 
    </>)

}

export default function AsynRenderList({componetList = []}) {
    return <>
        {
        componetList.map((com) => <AsynRender 
            key={com.id} 
            componetsUrl={com.componentUrl} 
            componentName={com.name} />)
        }
    </>
};