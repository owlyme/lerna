import React, { useState, useEffect } from "react"

const HOST = "http://172.27.43.197:4000"
function loadScript(scriptPath, cb = f => f) {
    window.React = React;
    // console.log("window.WeiMob", window.WeiMob)
    const afterLoadedFn = () => {
        cb(window.WeiMob)
    }

    const SCRIPT = document.createElement("SCRIPT");

    SCRIPT.onload = () => {
        afterLoadedFn()
    }

    SCRIPT.setAttribute('src', scriptPath);
    document.body.appendChild(SCRIPT);
}

function CompRender({componentName, config}) {
    const Comp = window.WeiMob[componentName]
    return <Comp baseConfig={config} />
}
export const SyncRender = ({ Component }) => {
    const [loaded, setLoadedState] = useState(false);
    const [asyncComponent, setAsyncComponent] = useState([]);


    useEffect(() => {
        // 1627609007109
        fetch(HOST + "/get/config?id=1627609007109")
            .then(response => response.json())
            .then(res => {
                const scriptPath = HOST+"/compose/js?js=";

                loadScript(scriptPath + res.map(i=> i.path).join(";"), (componets) => {
                    setLoadedState(true);
                    console.log(componets);
                    setAsyncComponent(res);
                })
            })
    }, []);

    return (<>
        {
            loaded ? <div>
                {asyncComponent.map(config => <CompRender
                 key={config.id}
                 componentName={config.name} />)}
            </div> : "lodading"
        }
    </>)
}
