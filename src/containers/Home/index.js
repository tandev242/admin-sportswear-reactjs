import React ,{useEffect} from 'react';
import { Jumbotron } from 'react-bootstrap';
import Layout from '../../components/Layout';
import axios from 'axios';

const Home = (props) => {
    
    return (
        <Layout sidebar>
            <Jumbotron style = {{ margin: '5rem' , background: '#fff' }} className = 'text-center'>
                <h1> WELCOME TO Dashboard </h1>
            </Jumbotron> 
        </Layout>
    );
}

export default Home;
