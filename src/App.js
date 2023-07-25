import { useEffect, useState } from 'react';
import './App.css';
import Form from './form/Form';
import { StateProvider } from './Context';
import DbAxios from './dbconnection/DbAxios'
import Template from './form/Template';

function App() {
  const [page, setPage] = useState('form');

    
  const handlePageForm = () =>{
    setPage('form');
  }
  const handlePageTemplate = () =>{
    setPage('template');
  }
  return (
    <StateProvider>
      <div className="App">
        {page === 'form' && (<Form handlePageTemplate={handlePageTemplate}/>)}
        {page === 'template' && (<Template handlePageForm={handlePageForm}/>)}
        {/* <DbAxios /> */}
      </div>
    </StateProvider>
  );
}

export default App;