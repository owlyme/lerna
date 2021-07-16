import React, {useState, useEffect} from "react"

function loadScript(cb =f=>f) {

    window.React = React;
    console.log("window.WeiMob", window.WeiMob)
    let afterLoadedFn = () => {
        cb(window.WeiMob)
    }

    let s = document.createElement("SCRIPT");

    s.onload = () => {
        afterLoadedFn()
    }
 
    s.setAttribute('src', "http://localhost:3000/compose/js?js=A1.umd.js;A2.umd.js");
    document.body.appendChild(s);
}


export const SyncRender = ({Component}) => {
    const [loaded, setLoadedState] = useState(false)
    const [AsyncComponent, setAsyncComponent] = useState({})

    useEffect(() => {
        loadScript( (componets) => {
            setLoadedState(true);
            console.log(componets)
            setAsyncComponent(componets)
        })
    }, []);

    

    
    return (<>
        {
            loaded ? <div>
                {Object.values(AsyncComponent).map(Comp => <Comp />)}
            </div> : "lodading"
        }
    </>)
}
