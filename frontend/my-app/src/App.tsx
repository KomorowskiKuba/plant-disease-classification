import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { useState } from 'react'
import axios from 'axios';

export interface Clasiffication {
  name: string
  probability: number;
  tips: string[]
}


function App() {
  const [file, setFile] = useState(null);
  const [classification, setClassification] = useState<Clasiffication>();
  const [name, setName] = useState(null);
  const [probability, setProbability] = useState(null);
  const [tips, setTips] = useState(null);
  const formData = new FormData();

  function onFileUploaded(e: any) {

    const fileExtension = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1)

    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'bmp') {
      formData.append("image", e.target.files[0])
      setFile(e.target.files[0]);
      console.log("target files:")
      console.log(e.target.files[0]);

      console.log("file uploaded")
      console.log(file)

      console.log("formData")
      console.log(formData)

    } else {
      alert('The file extension must be equal .jpg, .png or .bmp!');
    }
  };

  const getClassification = async () => {
    //  const formData 
    //formData.append("file", file)
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
      // }).then((res) => {
      //   // let result = (res && res.data && res.data[0].file) || [];
      //   setName(res.data.name);
      //   setProbability(res.data.probability);
      //   setTips(res.data.tips);

    }).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.error(error);
      });;
    console.log("response:")

    console.log(response)

  }

  function onFileSent() {
    if (!file) {
      alert("You have to upload the file before submitting!")
    }
    getClassification();
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
      <Card className="m-5 p-4">
        <Card.Text>Your plant disease is probably...</Card.Text>
        <Card.Text>Probability...</Card.Text>
        <Card.Text>Tips...</Card.Text>


      </Card>

    </div>
  );
}

export default App;
