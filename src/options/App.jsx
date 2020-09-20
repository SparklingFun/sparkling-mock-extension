import React from "react";
import { Helmet } from "react-helmet"
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'

import MockRecordTable from './components/mockRecordTable'

function App() {
    return (
        <div>
            <Helmet>
                <title>Options - Sparkling Mock</title>
                <meta name="description" content="Sparkling Mock Options Page" />
            </Helmet>
            <MockRecordTable />
        </div>
    )
}

export default App;