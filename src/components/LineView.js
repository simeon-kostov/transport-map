import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectLineById } from "../redux/reducers/linesSlice";
import { useEffect, useState } from "react";
import Route from "./Route";
import MainView from "./MainView";
import { Button, Table } from "react-bootstrap";
import L from "leaflet";



const LineView = function () {
    const params = useParams();
    const navigate = useNavigate();
    const [selectedLineId, setSelectedLineId] = useState('');
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        setSelectedLineId(params.lineId)
    }, [])

    function handleDirectionChange() {
        if (direction === 0) {
            setDirection(1)
        } else {
            setDirection(0)
        }
    }

    const selectedLine = useSelector(state => selectLineById(state, selectedLineId))

    return (
        <>
            {selectedLine
                && (
                    <>
                        <div className='app-container'>
                            <div className='menu-container'>
                                <div class="table-container">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Направление: {selectedLine.routes[direction].name}</th>
                                            </tr>
                                            <tr>
                                                <th><Button onClick={handleDirectionChange}>Направление</Button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedLine.routes[direction].stops.map((stop, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{stop.name}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className='map-container'>
                                <MapContainer center={[42.6797, 23.3271]} zoom={13} scrollWheelZoom={true} >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {selectedLine
                                        && (
                                            <Route route={selectedLine.routes[direction]} />
                                        )
                                    }
                                </MapContainer >
                            </div>
                        </div>
                    </>
                )}
            {!selectedLine && (<MainView />)}
        </>
    );
};

export default LineView;