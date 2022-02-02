import React,{useRef,useState} from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { dns } from "../dns";
import DisplayCard from "./card";
import Table from "./table"


function SearchBox(){
    const search_ref=useRef(null)
    const [displayCard,setDisplayCard] = useState(false)
    const [searchResult,setSearchResult] = useState(null)
    const fetch_data = async (search_value) =>{
        try{
            let response = await axios.get(`${dns}/insurance/search/${search_value}`)
            setSearchResult(response.data[0])
            if(response.data[0]){
                setDisplayCard(true)
            }else{
                setDisplayCard(false)
            }
        }catch(error){
            console.log(error)
        }
      
    }
    const onClearHandler = () =>{
        search_ref.current.value = ""
        setDisplayCard(false)
    }
    const onSearchHandler = () =>{
        if(search_ref.current.value){
        fetch_data(search_ref.current.value)
    }
    }
    return (
        <Container fluid className='p-3'>
            <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                    <InputGroup>
                        <Form.Control placeholder='Search for Policy ID or Customer ID to Edit' ref={search_ref}/>
                        
                        <button type='button' className='btn btn-success' onClick={onSearchHandler}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-search'
                                viewBox='0 0 16 16'
                            >
                                <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                            </svg>
                        </button>
                        <button type='button' className='btn btn-secondary' onClick={onClearHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
                        </button>
                    </InputGroup>
                </Col>
                <Col lg={3}></Col>
            </Row>
            <br/>
            {displayCard?
            <DisplayCard data={searchResult && searchResult} showcard={setDisplayCard}/>
            :<><Table/></>}

        </Container>
    );
}
export default SearchBox;