import * as React from "react";
import { useParams } from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import {useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "../styles/Results.css"
import Table from "./Table"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function Results() {
    const { votingproject } = useParams();

    const [totalforproj1, settotalforproj1] = useState(0);
    const [totalforproj2, settotalforproj2] = useState(0);
    const [totalforproj3, settotalforproj3] = useState(0);
    const [totalforproj4, settotalforproj4] = useState(0);

    let v1 = 0;
    let v2 = 0;
    let v3 = 0;
    let v4 = 0;

    const [project, setprojects] = useState([]);


    let temp = [];
  
  async function projectsetup() {
    const querySnapshot = await getDocs(collection(db, "votingproject"));
    querySnapshot.forEach((doc) => {
  
      if (doc.data().projectname === votingproject) {
      temp.push(doc.data().project1);
      temp.push(doc.data().project2);
      temp.push(doc.data().project3);
      temp.push(doc.data().project4);
        }
    });
    setprojects(temp);
    temp = [];
  }
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }


    async function sharebuttonclick() {
      let text = "https://quadratic-voting-sigma.vercel.app/results/";
      text = text + votingproject;
      copyTextToClipboard(text);
    }

    async function resultssetup() {
        const querySnapshot = await getDocs(collection(db, "voting"));
        querySnapshot.forEach((doc) => {
  
          if (doc.data().projectname === votingproject) {
                v1 = v1 + parseInt(doc.data().vote1);
                v2 = v2 + parseInt(doc.data().vote2);
                v3 = v3 + parseInt(doc.data().vote3);
                v4 = v4 + parseInt(doc.data().vote4);
            }
        });
        settotalforproj1(v1);
        settotalforproj2(v2);
        settotalforproj3(v3);
        settotalforproj4(v4);
      }
    
    resultssetup()

    useEffect(() => {
      projectsetup();
    }, []);

    return (
      <div> 
        <div className="cent" >
        <p className="share" > Copy to Share Link </p>
      <a href=""> <ContentCopyIcon onClick={sharebuttonclick} style={{ fontSize: 50, color:'white',marginBottom:20 }} />  </a>
            <Button onClick={resultssetup}  style ={{
        backgroundColor: "white",
        borderRadius: "5px",
        color: "black",
        fontFamily: "monospace"
      }}> See Results </Button>
            <p className="resultdisplay"> Name of Voting: {votingproject} </p> 
            <p className="resultdisplay"> Total Votes for {project[0]}: {totalforproj1} </p> 
            <p className="resultdisplay"> Total Votes for {project[1]}: {totalforproj2} </p> 
            <p className="resultdisplay"> Total Votes for {project[2]}: {totalforproj3} </p> 
            <p className="resultdisplay"> Total Votes for {project[3]}: {totalforproj4} </p>
            
            
            </div>
            <div className="tableouter">
            <Table /> 
            </div>
            <div className="intro">
            <p> Built with ❤️ by <a href="https://twitter.com/mehulrastogi20" target="blank"> MehulRastogi </a>
            <br  /> Open sourced on <a href="https://github.com/Mehul20/QuadraticVoting" target="blank"> Github  </a>
            </p>
            </div>
            </div>
            
    );
    
}
export default Results;
