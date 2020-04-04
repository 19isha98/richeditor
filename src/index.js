import React from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter}  from 'react-router-dom';
import RichEditorExample from './components/Editor';
const App=()=>{
return (
    <BrowserRouter>
    <Route path="/" component={RichEditorExample}/>
    </BrowserRouter>    
)
}

ReactDOM.render(<App/>, document.getElementById('root'));

