import { useState, useEffect } from "react";
import { CardImg } from "reactstrap";

const CardPelicula = ({ id }) => {

    const [datosPelicula, setDatosPelicula] = useState({});

    const buscarPelicula = async () => {

        const response = await fetch("/api/peliculas/Pelicula/" + id);

        if (response.ok) {
            const data = await response.json();
            setDatosPelicula(data);
        }
        else {
            console.log("Error al traer Datos");
        }
    }

    useEffect(() => {
        buscarPelicula();
    }, []);

    console.log(datosPelicula);

    return (
        <div className="card-1">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card mt-4">
                        <div className="container pruduct-1 align-items-center p-2">
                            <div className="row ">
                                <div className="col-md-4 m-1">
                                    <CardImg
                                        className="rounded"
                                        src={datosPelicula.poster}
                                        alt=""
                                        height="280"
                                        width="140"
                                    />
                                </div>
                                <div className="col-md-7 ml-4 d-flex flex-wrap align-content-around">
                                    <div className="text-sm-left">
                                        <div className="container pruduct-1 align-items-center p-2">
                                            <h6 className="small font-weight-bold mr-2">Titulo: </h6>
                                            <span className="text-capitalize">{datosPelicula.title}</span>
                                        </div>
                                        <div className="container pruduct-1 align-items-center p-2">
                                            <div className="d-flex flex-row">
                                                <h6 className="font-weight-bold mr-2">Tipo:</h6>
                                                <span>{datosPelicula.type}</span>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <h6 className="font-weight-bold mr-2">Genero:</h6>
                                                <span>{datosPelicula.genre}</span>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <h6 className="font-weight-bold mr-2">Idioma:</h6>
                                                <span>{datosPelicula.language}</span>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <h6 className="font-weight-bold mr-2">Director:</h6>
                                                <span>{datosPelicula.director}</span>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <h6 className="font-weight-bold mr-2">Fecha de realización:</h6>
                                                <span className="text-capitalize">{datosPelicula.year}</span>
                                            </div>
                                            <div className="container pruduct-1 align-items-center p-2">
                                                <h6 className="font-weight-bold mr-2">Descripción: </h6>
                                                <span>{datosPelicula.plot}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPelicula;