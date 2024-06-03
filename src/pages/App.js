import React from "react";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Button, Container, Spinner, Table } from "reactstrap";
async function getApiArticle() {
  const response = await fetch(`${process.env.REACT_APP_BE_URL}/api/article`)
  const data = await response.json();
  return data;
}

function App() {
  const [article, setArticle] = React.useState([]);
  const[isLoading, setIsLoading] = React.useState(false);
  React.useEffect(function () {
    setIsLoading(true);
    getApiArticle()
      .then(function (value) {
        setArticle(value.kumpulanArtikel)
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
  }, []);
  return (

    <Container className="mt-3">
      <h3>Blog Article</h3>
      <Table
        bordered
        hover = {!isLoading}
        responsive
        striped = {!isLoading}
      >
        <thead>
          <tr>
            <th style={{ width: "10%" }}>
              Id
            </th>
            <th style={{ width: "70%" }}>
              Title
            </th>
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ?
            <tr>
              <td className="text-center" colSpan={3}>
              <Spinner
              className="m-5" color="primary">
                Loading...
              </Spinner>
              </td>
            </tr> :
            article.map(function (value) {
              // key pada tr agar tdk ada conlose error di fe
              return (<tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.title}</td>
                <td className="text-center">
                  <Link to={`/detail/${value.id}`}><Button
                    color="secondary"
                    outline
                  >
                    Detail
                  </Button></Link>

                </td>
              </tr>)
            })}
        </tbody>
      </Table>

      <Button className="mt-3"
        block
        color="primary"
      >
        Tambah Article
      </Button>
      <ToastContainer />

    </Container>


  );
}

export default App;
