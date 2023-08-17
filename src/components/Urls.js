import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Urls() {

  const [urlres, setUrlres] = useState([]);
  const [longurl, setLongurl] = useState('');

  let navigate = useNavigate();

  let ltos = async (e) => {
    e.preventDefault();

    try {

      const lurl = await axios.post(`${process.env.REACT_APP_APIURL}/create`, { longUrl: longurl })

      if (lurl.data.statusCode === 200) {

        toast.success("URL Shorterned", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        const data = lurl.data;
        setUrlres([...urlres, data]);
        setLongurl('');
        navigate('/allurls')

      } else {
        toast.error(lurl.data.message, {
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
      toast.error("Internal Server Error", {
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


  }




  return (
    <>
      <Form className='m-5' onSubmit={ltos}>
        <h1 className='head'>URL Shortern</h1>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Paste long url" value={longurl} onChange={(e) => setLongurl(e.target.value)} />
        </Form.Group>
        <Button variant="danger" type="submit">
          Submit
        </Button>  &nbsp;
        <Link to="/allurls">
          <Button variant="secondary" type="submit">
            View All Shortern urls
          </Button>
        </Link>
      </Form>
      <ToastContainer />
    </>
  )
}

export default Urls