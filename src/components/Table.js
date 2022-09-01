import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "../styles/Results.css"


function createData(name, v1, v2, v3, v4) {
  return { name, v1, v2, v3, v4 };
}





export default function BasicTable() {

  const { votingproject } = useParams();
  const [rows,setRows] = useState([]);
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

let rowscopy = [];
async function resultstable() {
  

  const querySnapshot = await getDocs(collection(db, "voting"));
  querySnapshot.forEach((doc) => {

    if (doc.data().projectname === votingproject) {
      rowscopy.push(createData(doc.data().name,doc.data().vote1,doc.data().vote2,doc.data().vote3,doc.data().vote4))
      }
      
  });
  setRows(rowscopy);
  rowscopy = [];
}
useEffect(() => {
  resultstable();
  projectsetup();
}, []);


  return (
    <TableContainer component={Paper} className="tabledesign">
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "40%" }} >Name </TableCell>
            <TableCell style={{ width: "15%" }} align="right">{project[0]}</TableCell>
            <TableCell style={{ width: "15%" }} align="right">{project[1]}</TableCell>
            <TableCell style={{ width: "15%" }} align="right">{project[2]}</TableCell>
            <TableCell style={{ width: "15%" }} align="right">{project[3]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {console.log(rows)}
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.v1}</TableCell>
              <TableCell align="right">{row.v2}</TableCell>
              <TableCell align="right">{row.v3}</TableCell>
              <TableCell align="right">{row.v4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}