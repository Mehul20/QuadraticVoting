import * as React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"



function App() {
  const navigate = useNavigate();
  const startvote = async () => {
      navigate("/form")
};
  return (
    <div className="center"> 
      <div className="heading1">
       Want to try Quadratic Voting to ensure that a mathematically sound decision is made?
      </div>
      <div> 
      <Button onClick={startvote} style ={{
        backgroundColor: "white",
        borderRadius: "5px",
        color: "black",
        fontFamily: "monospace"
      }}> Lessgo </Button> 
      </div>
    </div>
  );
}

export default App;
