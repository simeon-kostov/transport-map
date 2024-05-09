import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Table } from 'react-bootstrap';

import TransportTypes from './TransportTypes';
import Line from './Line';
import { fetchLinesData } from '../redux/reducers/linesSlice';
import { useNavigate } from 'react-router';







const MainView = function () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { lines, loading, error } = useSelector((state) => state.lines);
    const { transportTypes } = useSelector((state) => state.transportTypes);


    // Acquire All Lines
    useEffect(() => {
        dispatch(fetchLinesData());
        //    console.log(lines)
    }, [dispatch]);



    // if (loading) {
    //     return <div><Spinner />Loading...</div>;
    // }
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }


    // Check if a transport type is selected
    let selectedTransportType = '';
    transportTypes.forEach((transportType) => {
        if (transportType.selected) {
            selectedTransportType = {
                code: transportType.code,
                name: transportType.name
            }

        }
    })


    const handleSelect = (e) => {
        navigate(`/lines/${e.target.id}`)
        //    console.log(e.target)
    }


    return (
        <div className='app-container'>
            <div className='menu-container'>
                <div className='table-container'>

                    <TransportTypes />

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Линии: {selectedTransportType.name}</th>
                            </tr>
                        </thead>
                        <tbody>

                            {selectedTransportType
                                && lines.filter(line => line.routes[0].transportType === selectedTransportType.code)
                                    .map((line, index) => {
                                        return (
                                            <tr key={index} onClick={handleSelect}>
                                                <td id={line.line}>{line.routes[0].name}</td>
                                            </tr>
                                        )
                                    })
                            }

                            {!selectedTransportType && lines.map((line, index) => {
                                return (
                                    <tr key={index} onClick={handleSelect}>
                                        <td id={line.line}>{line.routes[0].name}</td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </Table>

                </div>
            </div>
            <div className='map-container'>
                <MapContainer center={[42.6797, 23.3271]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {selectedTransportType
                        && lines.filter(line => line.routes[0].transportType === selectedTransportType.code)
                            .map((line, index) => {
                                return (
                                    <Line line={line} key={index} />
                                )
                            })
                    }

                    {!selectedTransportType && lines.map((line, index) => {
                        return (
                            <Line line={line} key={index} />
                        )
                    })
                    }

                </MapContainer >
            </div>
        </div>
    );

}

export default MainView;