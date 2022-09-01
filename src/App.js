import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Form from "./components/Form"
import Share from "./components/Share"
import Results from "./components/Results"


function App() {
  return (
    <div >
      <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />

      <Route path="/formselection">
        <Route path=":votingproject" element={<Share /> } />
      </Route>

      <Route path="/results">
        <Route path=":votingproject" element={<Results /> } />
      </Route>



      </Routes>
    </div>
  );
}

export default App;
