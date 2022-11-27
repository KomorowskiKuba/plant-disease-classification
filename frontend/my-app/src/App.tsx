import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { useState } from 'react'
import axios from 'axios';


function App() {
  const formData = new FormData();
  const [probability, setProbability] = useState(0);
  const [name, setName] = useState("");
  const [tips, setTips] = useState([]);

  var n = null;
  var p = null;
  var t = null;

  function onFileUploaded(e: any) {

    const fileExtension = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1)

    if (fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'png' || fileExtension.toLowerCase() === 'bmp') {
      formData.append("image", e.target.files[0])
    } else {
      alert('The file extension must be equal .jpg, .png or .bmp!');
    }
  };

  const getClassification = async () => {
    const response = await axios({
      method: "post",
      url: "https://process-and-predict-plant-disease.azurewebsites.net/api/process-image",
      data: formData,
      headers: {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      },
    }).then((res) => {
      t = res.data.tips;
      p = res.data.probability;
      n = res.data.name;
      setProbability(res.data.probability)
      setName(res.data.name)
      setTips(res.data.tips)
    }).then(response => {
    })
      .catch(error => {
        console.error(error);
      });;
  }

  function onFileSent() {
    if (formData.entries().next().done) {
      alert("You have to upload the file before submitting!")
    }
    else {
      getClassification();
    }

  };


  return (
    <div >
      <Navbar className='nav' >
        <Navbar.Brand className="navbrand" style={{ color: "white", textAlign: "center", display: "block", float: "none" }} >PlantEye</Navbar.Brand>
      </Navbar>
      <Card className="m-5 p-3">
        <Card.Title>Plant Disease Classification Application</Card.Title>
        <Card.Text>Upload photo of your plant</Card.Text>
        <small>The photo should display potential plant disease</small>
        <Form.Group>
          <small >The extension of uploaded file must be: .jpg, .png or .bmp</small>
        </Form.Group>
        <Form.Group controlId="formFile" className="mt-3" style={{ width: "30%" }}>
          <Form.Control onChange={onFileUploaded} className="mb-3" type="file" />
          <Button onClick={onFileSent} style={{ backgroundColor: "#166f1f", borderColor: "white", width: "40%" }} type="button" >Check</Button>

        </Form.Group>
      </Card>
      {name != "" && <Card className="m-5 p-4">

        <Card.Text style={{ fontWeight: "bold" }}>Your plant disease is probably:</Card.Text>
        <p>{name} times</p>

        <Card.Text style={{ fontWeight: "bold" }} >Probability:</Card.Text>
        <p> {(probability * 100).toFixed(2) + '%'}</p>

        <Card.Text style={{ fontWeight: "bold" }}>Tips:</Card.Text>
        <ul> {tips.map((item,i) => <li key={i}>{item}</li>)}</ul>
        

      </Card>
      }

    </div>
  );
}

export default App;
