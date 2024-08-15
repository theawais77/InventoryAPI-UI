import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(0);

    const [editID, setEditID] = useState([]);
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');
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
        setData(invData)
    }, [])

    const handleEdit = (id) => {
        // alert(id)
        handleShow();
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this information") == true) {
            alert(id)
        }
    }
    const handleUpdate = () => {

    }



    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <input type='text' className='form-control' placeholder='Enter Name'> value={name}</input>
                    </Col>
                    <Col> <input type='text' className='form-control' placeholder='Enter Description'value={age}></input></Col>
                    <Col> <input type='value' className='form-control' placeholder='Enter Quantity'value={quantity}></input></Col>
                    <Col> <input type='value' className='form-control' placeholder='Enter Price'value={price}></input></Col>
                    <Col> <input type='checkbox'></input>
                        <label>InStock</label></Col>
                    <Col><button className='btn btn-primary'>Submit</button></Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
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
                            <input type='text' className='form-control' placeholder='Enter Name'></input>
                        </Col>
                        <Col> <input type='text' className='form-control' placeholder='Enter Description'></input></Col>
                        <Col> <input type='value' className='form-control' placeholder='Enter Quantity'></input></Col>
                        <Col> <input type='value' className='form-control' placeholder='Enter Price'></input></Col>
                        <Col> <input type='checkbox'></input>
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