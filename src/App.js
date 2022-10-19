import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TableContainer from "./components/Table/TableContainer";
import LoginContainer from "./components/Login/LoginContainer";
import React from "react";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/table/*" element={<TableContainer />}/>
                    <Route path="/*" element={<LoginContainer />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
