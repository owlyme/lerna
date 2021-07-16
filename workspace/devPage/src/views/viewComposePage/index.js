import React, { useEffect, useState } from "react";
import { SyncRender} from "../../components/SyncRender"




export default function ViewComposePage(props) {
    return <div>

        <SyncRender Component={window.WeiMob}></SyncRender>
    </div>
};
