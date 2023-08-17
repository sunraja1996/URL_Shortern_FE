import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Allurls() {


    const [urldatas, setUrldatas] = useState([]);


    const allurls = async () => {

        try {
            const allurl = await axios.get(process.env.REACT_APP_APIURL)
            if (allurl.data.statusCode === 200) {

                toast.success(allurl.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                const data = allurl.data.allurl;
                setUrldatas(data);
                console.log(data);

            } else {
                toast.error(allurl.data.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        allurls();
    }, []);

    

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_APIURL}/del/${id}`);
            if (response.data.statusCode === 200) {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setUrldatas(urldatas.filter(url => url._id !== id));
            } else {
                toast.error(response.data.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <h1 className='head'>All Urls</h1>
            <div className='d-flex justify-content-center'>
            <Button variant="info" onClick={() => allurls()}>Refresh</Button> &nbsp;
            <Link to="*">
          <Button variant="success" type="submit">
            Create Shortern URL
          </Button>
        </Link>
            </div>

            <hr></hr>
            
            <div className="row">
                {urldatas && urldatas.length > 0 ? (
                    urldatas.map((url) => (
                        <div className="col-lg-3" key={url._id}>
                                        <Card className='m-2 bg-dark text-white'>
                            <Card.Header variant="success">{url.shortUrl}</Card.Header>
                            <Card.Body>
                                <Card.Title>Short Url : {url.shortUrl}</Card.Title>
                                <Card.Text>
                                    Original URL : {url.longUrl}
                                </Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Clicks : {url.click}</ListGroup.Item>
                                </ListGroup>
                                <div  className='mt-2 d-flex  justify-content-around'>
                                <Card.Link><Button variant="success">Click </Button> </Card.Link>
                                 &nbsp;
                                <Button variant="danger" onClick={() => handleDelete(url._id)}>Delete</Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No URL data available.</p>
                )}
                </div>
            <ToastContainer />
        </>
    )
}

export default Allurls