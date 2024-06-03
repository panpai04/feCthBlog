import { Link, useParams } from "react-router-dom";
import { Button, Card, CardText, CardTitle, Col, Container, Row, Spinner, Table } from "reactstrap";
import React from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
async function getDetailArticle(id) {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/api/article/detail/${id}`)
    const data = await response.json();
    return data;
  }
function BlogDetail() {
    const [detail, setDetail] = React.useState([]);
    const[isLoading, setIsLoading] = React.useState(false);
    //get id from path
    const { id } = useParams();

        React.useEffect(function () {
            setIsLoading(true);
      getDetailArticle(id)
        .then(function (value) {
            setDetail(value.data)
          // console.log('data:', value)
        })
        .catch((error) => {
          console.log(error);
          toast.error('Something Wrong!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        })
        .finally(()=>{
            setIsLoading(false)
          })
     
    }, [id]);
    return (
        <Container className="mt-3">
         {isLoading ? 
            <Table>
                <tbody>
                <tr>
                    <td style={{width: "100%"}} className="text-center"><Spinner
              className="m-5" color="primary">
                Loading...
              </Spinner></td>
                </tr>
                </tbody>
            </Table>
           
           :
                <Card
                    body

                >
                    <CardTitle tag="h5">
                        {detail.title}
                    </CardTitle>
                    <CardText>
                        {detail.body}
                    </CardText>
                    <Row xs={1} lg={3}>
                        <Col><Link to={'/'}><Button block outline className="m-1">
                                Kembali
                            </Button></Link>
                            
                        </Col>
                        <Col>
                            <Button block color="primary" className="m-1">
                                Update
                            </Button>
                        </Col>
                        <Col>
                            <Button block color="danger" className="m-1">
                                Delete
                            </Button>
                        </Col>
                    </Row>



                </Card>
                }

                <ToastContainer />
        </Container>


    )
}

export default BlogDetail;