import { useState, Fragment } from "react";
import { CardImg, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import CardPelicula from "./CardPelicula";

const Busqueda = ({ data }) => {

    const [abrirModal, setAbrirModal] = useState(false);

    return (
        <Fragment>
            <div className="card-1">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <div className="container pruduct-1 align-items-center p-2">
                                <div className="row ">
                                    <div className="col-md-4 m-1">
                                        <CardImg
                                            className="rounded"
                                            src={data.poster}
                                            alt=""
                                            height="210"
                                            width="140"
                                        />
                                    </div>
                                    <div className="col-md-7 ml-4 d-flex flex-wrap align-content-around">
                                        <div className="text-sm-left">
                                            <div className="container pruduct-1 align-items-center p-2">
                                                <h6 className="small font-weight-bold mr-2">Titulo: </h6>
                                                <span className="text-capitalize">{data.title}</span>
                                            </div>
                                            <div className="container pruduct-1 align-items-center p-2">
                                                <div className="d-flex flex-row">
                                                    <h6 className="font-weight-bold mr-2">Tipo:</h6>
                                                    <span>{data.type}</span>
                                                </div>
                                                <div className="d-flex flex-row">
                                                    <h6 className="font-weight-bold mr-2">Fecha de realización:</h6>
                                                    <span className="text-capitalize">{data.year}</span>
                                                </div>
                                            </div>
                                            <div className="container pruduct-1 align-items-center p-2">
                                                <Button
                                                    style={{ borderRadius: `2rem 2rem 2rem 2rem` }}
                                                    onClick={() => {
                                                        setAbrirModal(true);
                                                    }}
                                                ><span>Ver mas</span></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={abrirModal}>
                <ModalBody className="container">
                    <div className="d-flex justify-content-md-end ">
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ margin: `0` }}
                            onClick={() => {
                                setAbrirModal(false);
                            }}
                        >X</button>
                    </div>
                    <CardPelicula id={data.imdbID } />
                </ModalBody>
            </Modal>
        </Fragment>                
    );
}

export default Busqueda;