import React,{useState,useRef} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { dns } from "../dns";


//indivisual display of card component
function DisplayCard({data}) {
    const updateBox = useRef("")
    const [showEdit,setShowEdit] = useState(false)
    const [checkNumber, setNumberCheck] = useState(false)

    const toggle =() =>{
        setShowEdit(true)
        
    }

    const updateData = () =>{
        let num =updateBox.current.value
        if(num){
        axios.put(`${dns}/insurance/update/${data.policy_id}`,{premium: num})
        .then(()=>{
            data.premium = updateBox.current.value 
            setShowEdit(false)
            setNumberCheck(false)
        })
    }else{
        setNumberCheck(true)
        }
        
    }

   
    const numberHandler =()=>{
        let num =updateBox.current.value
        if(num<0 || num>1000000){
            setNumberCheck(true)
        }
        else if(checkNumber){
            setNumberCheck(false)
        }
    }
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Policy ID: {data && data.policy_id}
                                &nbsp;| Customer ID: {data && data.customer_id}
                            </Card.Title>
                            <li className='list-group-item'>
                                <b>Date of Purchase:</b>{' '}
                                {data && data.date_of_purchase}
                            </li>
                            <li className='list-group-item'>
                                <b>Fuel:</b> {data && data.date_of_purchase}
                            </li>
                            <li className='list-group-item'>
                                <b>Vehicle Segment:</b>{' '}
                                {data && data.vehicle_segment}
                            </li>
                            <li className='list-group-item'>
                                <b>Premium:</b> {data && data.premium}
                                {showEdit ? (
                                    <Row>
                                        <Col lg={3}>
                                            <InputGroup>
                                                <Form.Control
                                                    type='number'
                                                    min='0'
                                                    max='1000000'
                                                    ref={updateBox}
                                                    placeholder='Enter new premium'
                                                    onInput={numberHandler}
                                                />
                                                <button
                                                    type='button'
                                                    className='btn btn-success'
                                                    onClick={updateData}
                                                >
                                                    Update
                                                </button>
                                                {checkNumber ? (
                                                    <p style={{ color: 'red' }}>
                                                        Value should be between
                                                        1 to 1M
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                ) : (
                                    <>
                                        <button
                                            type='button'
                                            style={{
                                                fontSize: ' 0.8em',
                                                borderRadius: '20px',
                                            }}
                                            className='btn btn-sm  py-0 btn-success'
                                            onClick={toggle}
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='12'
                                                height='13'
                                                fill='currentColor'
                                                class=' bi bi-pencil-fill'
                                                viewBox='0 0 16 16'
                                            >
                                                <path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </li>
                            <li className='list-group-item'>
                                <b>Customer Gender:</b>{' '}
                                {data && data.customer_gender}
                            </li>
                            <li className='list-group-item'>
                                <b>Date of Purchase:</b>{' '}
                                {data && data.date_of_purchase}
                            </li>
                            <li className='list-group-item'>
                                <b>Customer Income Group:</b>{' '}
                                {data && data.customer_income_group}
                            </li>
                            <li className='list-group-item'>
                                <b>Customer Region:</b>{' '}
                                {data && data.customer_region}
                            </li>
                            
                            <li className='list-group-item'>
                                <Row>
                                    <Col lg={12}>
                                        <table className='table table-bordered' style={{textAlign:"center"}}>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Bodily Injury Liability
                                                    </th>
                                                    <th>
                                                        Personal Injury Protection
                                                    </th>
                                                    <th>
                                                        Property Damage Liability
                                                    </th>
                                                    <th>Collision</th>
                                                    <th>Comprehensive</th>
                                                    <th>
                                                        Customer Marital Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {data.bodily_injury_liability ===
                                                        1 ? (
                                                            <svg
                                                                fill='#228B22'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='25'
                                                                height='25'
                                                                class='bi bi-check-circle-fill'
                                                                viewBox='0 0 16 16'
                                                            >
                                                                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='25'
                                                                height='25'
                                                                fill='#ff0000'
                                                                class='bi bi-x-circle-fill'
                                                                viewBox='0 0 16 16'
                                                            >
                                                                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                                                            </svg>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {data &&
                                                            data.personal_injury_protection ===
                                                            1 ? (
                                                                <svg
                                                                    fill='#228B22'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    class='bi bi-check-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    fill='#ff0000'
                                                                    class='bi bi-x-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                                                                </svg>
                                                            )}
                                                    </td>
                                                    <td>
                                                        {' '}
                                                        {data &&
                                                            data.property_damage_liability ===
                                                            1 ? (
                                                                <svg
                                                                    fill='#228B22'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    class='bi bi-check-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    fill='#ff0000'
                                                                    class='bi bi-x-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                                                                </svg>
                                                            )}
                                                    </td>
                                                    <td>
                                                        {data && data.collision ===
                                                        1 ? (
                                                            <svg
                                                                fill='#228B22'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='25'
                                                                height='25'
                                                                class='bi bi-check-circle-fill'
                                                                viewBox='0 0 16 16'
                                                            >
                                                                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='25'
                                                                height='25'
                                                                fill='#ff0000'
                                                                class='bi bi-x-circle-fill'
                                                                viewBox='0 0 16 16'
                                                            >
                                                                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                                                            </svg>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {data &&
                                                            data.comprehensive ===
                                                            1 ? (
                                                                <svg
                                                                    fill='#228B22'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    class='bi bi-check-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    fill='#ff0000'
                                                                    class='bi bi-x-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                                                                </svg>
                                                            )}
                                                    </td>
                                                    <td>
                                                        {data &&
                                                            data.customer_marital_status ===
                                                            1 ? (
                                                                <svg
                                                                    fill='#228B22'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    class='bi bi-check-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='25'
                                                                    height='25'
                                                                    fill='#ff0000'
                                                                    class='bi bi-x-circle-fill'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                                                                </svg>
                                                            )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </li>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DisplayCard