import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import {useState} from 'react'

function App() {
  const [file, setFile] = useState(null);

  const onFileUploaded = async (e: any) => {

    const fileExtension = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') +1)

    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'bmp') {
      setFile(e.target.files[0]);
    } else {
      alert('The file extension must be equal .jpg, .png or .bmp!');
    }
  };

  const onFileSent = async () => {

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
          <Button onClick={onFileSent} style={{ backgroundColor: "#166f1f", borderColor: "white", width: "40%" }} type="button" >Upload</Button>

        </Form.Group>
      </Card>

    </div>
  );
}

export default App;
