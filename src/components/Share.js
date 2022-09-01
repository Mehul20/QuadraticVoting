import * as React from "react";
import { useParams } from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Share.css"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function Share() {
    const { votingproject } = useParams();
    const [project, setprojects] = useState([]);

    const [username, setusername] = useState();
    const [project1vote, setproject1vote] = useState();
    const [project2vote, setproject2vote] = useState();
    const [project3vote, setproject3vote] = useState();
    const [project4vote, setproject4vote] = useState();

    let temp = [];

    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }


    async function sharebuttonclick() {
      let text = "https://quadratic-voting-sigma.vercel.app/formselection/";
      text = text + votingproject;
      copyTextToClipboard(text);
    }

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
    const navigate = useNavigate();

   

    const buttonclick = async () => {
      let id = username.concat(votingproject)
    if (Math.pow(project1vote,2) + Math.pow(project2vote,2) + Math.pow(project3vote,2) + Math.pow(project4vote,2) <= 64) {
      await setDoc(doc(db, "voting", id), {
        name:username,
        projectname:votingproject,
        vote1: project1vote,
        vote2: project2vote,
        vote3: project3vote,
        vote4: project4vote,
      });
      navigate(`/results/${votingproject}`)
    } else {
      alert("Sum should be less than or equal to 64")
    }
  };

    useEffect(() => {
      projectsetup();
    }, []);
    
    return (
        <div className="App">

<Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }} className="box">
          <p className="share" > Copy to Share Link </p>
      <a href=""> <ContentCopyIcon onClick={sharebuttonclick} style={{ fontSize: 50, color:'white' }} />  </a>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your name"
            variant="filled"
            name="name"
            autoComplete="name"
            autoFocus

            onChange={(event) => {
              setusername(event.target.value)
            }}
            sx={{ backgroundColor:"white", input: { color: 'black' } }}
          />


                <div> 
                <InputLabel sx={{color:"white", fontFamily:"monospace"}}>
                {project[0]}
              </InputLabel>
              <TextField
              margin="normal"
              required
              fullWidth
              label="Vote for Choice 1"
              variant="filled"
              autofocus
              onChange={(event) => {
                setproject1vote(event.target.value)
              }}
              sx={{ backgroundColor:"white", input: { color: 'black' } }}
            />

<InputLabel sx={{color:"white", fontFamily:"monospace"}}>
                {project[1]}
              </InputLabel>
              <TextField
              margin="normal"
              required
              fullWidth
              label="Vote for Choice 2"
              variant="filled"
              autofocus
              onChange={(event) => {
                setproject2vote(event.target.value)
              }}
              sx={{ backgroundColor:"white", input: { color: 'black' } }}
            />

              <InputLabel sx={{color:"white", fontFamily:"monospace"}}>
                {project[2]}
              </InputLabel>
              <TextField
              margin="normal"
              required
              fullWidth
              label="Vote for Choice 3"
              variant="filled"
              autofocus
              onChange={(event) => {
                setproject3vote(event.target.value)
              }}
              sx={{ backgroundColor:"white", input: { color: 'black' } }}
            />

              <InputLabel sx={{color:"white", fontFamily:"monospace"}}>
                {project[3]}
              </InputLabel>
              <TextField
              margin="normal"
              required
              fullWidth
              label="Vote for Choice 4"
              variant="filled"
              autofocus

              onChange={(event) => {
                setproject4vote(event.target.value)
              }}
              sx={{ backgroundColor:"white", input: { color: 'black' } }}



            />  
            </div>


          <Button onClick={buttonclick} sx={{ backgroundColor:"white",marginTop:"10px", fontFamily:"monospace", "&:hover": {
  border: "1px solid #00FF00",
  backgroundColor: 'purple',
  fontFamily: 'monospace'
} }} > Submit for Voting
            </Button>
            <div className="rules"> 
            <p> -- Rules -- </p> 
            <p> Please use your Full Name while voting and don't vote twice!</p>
            <p> 
            You have 64 votes to use. 
            <br /> Every vote that you give to a choice will be taken away from the 64 after being squared.
            <br /> So, For example, if you give 4 votes to choice 1. You'll be left with 64 - 16 = 48 votes.
            <br /> If you give 1 vote, you will be left with 48 - 1 = 47 votes.
            <br /> If you give 2 votes, you will be left eith 47 - 4 = 43 votes.
            </p>
            
          </div>
           </Box>
      </Container>
     
        </div>
      );
     
}

export default Share;