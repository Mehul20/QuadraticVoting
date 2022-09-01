import * as React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css"
import { getDocs, collection } from "firebase/firestore";




function Form() {
const [campaignname, setcampaignname] = useState("");
const [Project1, setproject1] = useState("");
const [Project2, setproject2] = useState("");
const [Project3, setproject3] = useState("");
const [Project4, setproject4] = useState("");
const navigate = useNavigate();

const buttonclick = async () => {
  let flag = 0;
  const querySnapshot = await getDocs(collection(db, "votingproject"));
  querySnapshot.forEach((doc) => {

    if (doc.data().projectname === campaignname) {
         flag = 1; 
    }
  })

    if (flag === 0) {
    await setDoc(doc(db, "votingproject", campaignname), {
        projectname: campaignname,
        project1: Project1,
        project2: Project2,
        project3: Project3,
        project4: Project4,
      });
    navigate(`/formselection/${campaignname}`)
    } else {
      alert("Name of the voting campaign has already been taken. Please choose something else.")
    }
};

  return (
    <div className="newapp">
      <div className="heading">
        Each person you send this link will have 64 votes to divide among these 4 choices
        <br /> Right now we will restrain to 4 options
        </div>
       <Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }} className="box">

       <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Voting For?"
            variant="filled"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(event) => {
              setcampaignname(event.target.value);
            }}
            sx={{ backgroundColor:"white", input: { color: 'black' } }}
          />
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Choice 1"
            variant="filled"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(event) => {
              setproject1(event.target.value);
            }}
            sx={{ backgroundColor:"white", input: { color: 'black' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Choice 2"
            variant="filled"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(event) => {
              setproject2(event.target.value);
            }}
            sx={{ backgroundColor:"white", input: { color: 'black' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Choice 3"
            variant="filled"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(event) => {
              setproject3(event.target.value);
            }}
            sx={{ backgroundColor:"white", input: { color: 'black' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Choice 4"
            variant="filled"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(event) => {
              setproject4(event.target.value);
            }}
            sx={{ backgroundColor:"white", input: { color: 'black' } }}
          />

<Button onClick={buttonclick} 
 sx={{ backgroundColor:"white",marginTop:"10px", fontFamily:"monospace", "&:hover": {
  border: "1px solid #00FF00",
  backgroundColor: 'purple'
} }} > Ready to Share the Link? 
            </Button>


          </Box>
          </Container>


          <div className="intro">
            <p> Built with ❤️ by <a href="https://twitter.com/mehulrastogi20" target="blank"> MehulRastogi </a>
            <br  /> Open sourced on <a href="https://github.com/Mehul20/QuadraticVoting" target="blank"> Github  </a>
            </p>
            </div>
    </div>

  );
}

export default Form;
