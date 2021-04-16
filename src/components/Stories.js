import { useEffect,useState } from 'react';
import {Card, Button, Accordion, Container,Row,Image, Col,Alert} from 'react-bootstrap';
import { Chat, Trophy, Book} from 'react-bootstrap-icons';
import userimg from '../images/2.jpg'
import storyimg from '../images/1.png'
function Stories() {
    const [state, setstate]=useState({
                AllId:[]
        })

    useEffect(()=>{
        const getTopStory=()=>{
            fetch(`../Stories.json`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
              })
            .then((response) =>
            {
                if (!response.ok)
                    throw new Error("HTTP error " + response.status);
            
                return response.json();
            })
            .then((data) => {
               var Top=data.slice(Math.max(data.length - 10))
                setstate(state=>({...state,AllId:Top, storyId:state.storyId+1}))
            })
            .catch((error) => {
                console.error(error);
            });
        };
        getTopStory()
    },[])
  
  return (
    <>
    <div className="story-div">
       <h1 className="main-heading">10 great short stories everyone should read</h1>
    {state.AllId.map((state, key) => {
    return (<>
       <Container className="box-design">
            <Row>
                <Col xs={12} md={6}>
                    <div className="user-info">
                        <div className="user-pic">
                            <Image src={userimg} roundedCircle height="50px"/>
                        </div>
                        <div className="user-name">
                            <p className="writer-name"><b>{state.storyBy}</b></p>
                            <p className="date">14 April 2020</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        <Container className="box-design">
            <Row>
                <Col xs={12} md={12}>
                    <h5 className="story-title">{state.storyTitle}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    <Image src={storyimg} className="post-img img-fluid" height="100px"/>
                </Col>
                <Col xs={12} md={8}>
                    <Alert variant="light">
                        <Alert.Heading>What Story Says....</Alert.Heading>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting 
                            industry. Lorem Ipsum has been the industry's standard dummy text 
                            ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It has survived not 
                            only five centuries,
                        </p>
                        <a href="http://www.getdropbox.com/u/2/screencast.html">
                            <Button 
                                variant="danger" 
                                size="sm">
                                <Book /> Continue Reading..
                            </Button>
                        </a>
                    </Alert>
                </Col>
            </Row>
            <Container className="box-design">
            <Row>
                <Col md={12}>
                    <Accordion defaultActiveKey="0">
                        <div className="comment-head">
                            <Button variant="light" size="sm">
                                <span className="icon"><Trophy /></span>
                                Score <b>{state.score}</b>
                            </Button>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                <Button variant="light" size="sm">
                                    <span className="icon"><Chat /></span>
                                    Comments
                                </Button>
                            </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body className="p-0">
                            {state.kidsComment.map((data, key) => {
                                return (
                                    <div key={key} className="comment-box">
                                        <div className="comment-left">
                                            <Image 
                                                src={userimg} 
                                                roundedCircle 
                                                className="comment-pic" />
                                        </div>
                                        <div className="comment-right">
                                            <p className="comment-by">{data.by}</p>
                                            <p className="comment-text">{data.text}</p>
                                        </div>
                                    </div>
                                    );
                                })}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </Container>
        </>);
    })}
    </div>
    </>
  );
}

export default Stories;
