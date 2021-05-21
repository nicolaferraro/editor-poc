import React from 'react';

import './App.css';
import Editor from './camel/Editor';
import Catalog from './contexts/Catalog';
import { KameletCatalog } from './models/kamelet';

function App() {

  const [catalog, setCatalog] = React.useState<KameletCatalog>({items: []})

  React.useEffect(() => {
    fetch("/catalog.json")
      .then(res => res.json())
      .then(setCatalog)
  }, [])

  return (
    <Catalog.Provider value={catalog}>
      <div className="App">
        <div className="App-editor">
          <Editor />
        </div>
      </div>
    </Catalog.Provider>
  );
}

export default App;
