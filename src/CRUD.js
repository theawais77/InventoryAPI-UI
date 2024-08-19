import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export const CRUD = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(0);

    const [editID, setEditID] = useState([]);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editQuantity, setEditQuantity] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editStock, setEditStock] = useState(0);

    const invData = [
        {
            id: 1,
            name: "Apple",
            description: "string",
            quantity: 3,
            price: 30000,
            stock: false
        },
        {
            id: 2,
            name: "Lenovo E589",
            description: "Touch screeen",
            quantity: 5,
            price: 250000,
            stock: false
        },
        {
            id: 3,
            name: "Apple",
            description: "IOS",
            quantity: 9,
            price: 61000,
            stock: true
        }
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
         getData();
        //setData(invData);
    }, [])

    const getData = () => {
        axios.get('https://localhost:7142/api/Inventory')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', {
                    message: error.message,
                    stack: error.stack,
                    config: error.config,
                    response: error.response ? {
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers,
                    } : null,
                });
            })
    
    
    }

    const handleEdit = (id) => {
        // alert(id)
        handleShow();
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this information") === true) {
            alert(id)
        }
    }
    const handleSave=()=>{
        const url='https://localhost:7142/api/Inventory';
        const data={
            "name": name,
            "description": description,
            "quantity": quantity,
            "price": price,
            "stock": stock
          }
          axios.post(url,data)
          .then((result)=>{
            getData();
            clear();
          })
    }
    const clear=()=>{
        setName("");    
        setDescription("");
        setQuantity("");
        setPrice("");
        setStock("");
        setEditName("");    
        setEditDescription("");
        setEditQuantity("");
        setEditPrice("");
        setEditStock("");

    }
    const handleUpdate = () => {

    }

    return (
        <>
            <Container>
    <Row className="mb-3">
        <Col md={2}>
            <input type='text' className='form-control' placeholder='Enter Name'
                value={name} onChange={(e) => setName(e.target.value)}
            />
        </Col>
        <Col md={3}>
            <input type='text' className='form-control' placeholder='Enter Description'
                value={description} onChange={(e) => setDescription(e.target.value)}
            />
        </Col>
        <Col md={2}>
            <input type='number' className='form-control' placeholder='Enter Quantity'
                value={quantity} onChange={(e) => setQuantity(e.target.value)}
            />
        </Col>
        <Col md={2}>
            <input type='number' className='form-control' placeholder='Enter Price'
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
        </Col>
        <Col md={2}>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={stock === true}
                    onChange={(e) => setStock(e.target.checked)}
                />
                <label className="form-check-label">
                    InStock
                </label>
            </div>
        </Col>
        <Col md={1}>
            <button className='btn btn-primary' onClick={()=>handleSave()}>Submit</button>
        </Col>
    </Row>
</Container>

            
<Table striped bordered hover responsive className="mt-3">
    <thead className="thead-dark">
        <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {
            data && data.length > 0 ?
                data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.stock ? "Yes" : "No"}</td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={() => handleEdit(item.id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))
                :
                <tr>
                    <td colSpan="8" className="text-center">Loading...</td>
                </tr>
        }
    </tbody>
</Table>

            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify/Update Inventory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Name'
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Description'
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Quantity'
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Price'
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input
                                type='checkbox'
                                checked={editStock === 1}
                                onChange={(e) => setEditStock(e.target.checked ? 1 : 0)}
                            />
                            <label>InStock</label></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CRUD;
