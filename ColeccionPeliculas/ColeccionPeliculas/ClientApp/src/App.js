import { useEffect, useState } from "react";
import LogoHeader from "./Imagenes/Imagen8.jpg";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { MDBCol, MDBIcon } from "mdbreact";
import Busqueda from "./Componentes/Busqueda";

const App = () => {


    const [peliculas, setPeliculas] = useState([]);
    const [form, setForm] = useState("");

    const mostrarPeliculas = async () => {

        const response = await fetch("/api/peliculas/Lista_Default");

        if (response.ok) {
            const data = await response.json();
            setPeliculas(data);
        }
        else {
            console.log("Error al traer Datos");
        }
    }

    const handleChange = (e) => {
        setForm(e.target.value);
    }

    const BuscarPeliculas = async (e) => {
        e.preventDefault();
        var search = form;

        if (search != "") {
            const response = await fetch("/api/peliculas/ListaPeliculas/" + search);

            if (response.ok) {
                const data = await response.json();
                setPeliculas(data);
            }
            else {
                console.log("Error al traer Datos");
            }
        }       
    }

    useEffect(() => {
        mostrarPeliculas();
        setForm("");
    }, []);


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader  style={{ backgroundImage: `url(${LogoHeader})`, height:`150px` }}>
                            <h5>Lista de Peliculas</h5>
                            <form onSubmit={BuscarPeliculas}>
                                <MDBCol md="12" style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                                    <div className=" col-md-8 input-group md-form form-sm form-1 pl-0">
                                        <div className="input-group-prepend">
                                            <span type="submit" className="input-group-text purple lighten-3" id="basic-text1" style={{ borderRadius: `2rem 0 0 2rem` }}>
                                                <MDBIcon className="text-white" icon="search" />
                                            </span>
                                        </div>
                                        <input
                                            className="form-control white my-0 py-1"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search"
                                            style={{ borderRadius: `0 2rem 2rem 0` }}
                                            value={form}
                                            onChange={handleChange}
                                        />
                                                                      
                                    </div>
                                </MDBCol>
                            </form>  
                        </CardHeader>
                        <CardBody>
                            {
                                (peliculas.length < 1) ? (
                                    <MDBCol md="12" style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                                        <h1>No hay peliculas para ver</h1>
                                    </MDBCol>
                                ) : (
                                        <Container>
                                            <Row>
                                                {
                                                    peliculas.map((item) => {
                                                        return (
                                                            <div className="col-6 mt-5" key={item.imdbID}>
                                                                <Busqueda data={ item } />
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </Row>
                                        </Container>
                                        
                                )
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default App;
