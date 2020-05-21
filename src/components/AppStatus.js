import React from "react";
import {ProgressIndicator} from 'office-ui-fabric-react/lib/ProgressIndicator';
import {observer} from "mobx-react";

const AppStatus = ({store}) => {
    return (
        <div>
            {store.isLoading && <ProgressIndicator label="Loading" description="please wait"/>}
        </div>
    )
}

export default observer(AppStatus);
