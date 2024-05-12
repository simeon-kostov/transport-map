import { Polyline, Circle, Tooltip } from "react-leaflet";
import { Icon } from 'leaflet'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

// Custom Marker
const customMarkerIcon = new Icon({
    iconUrl: require("../images/full-circle.png"),
    iconSize: [20, 20]
})


const Route = function ({ route, lineId }) {

    const params = useParams();
    const navigate = useNavigate();

    const { transportTypes } = useSelector((state) => state.transportTypes);



    const selectedTransportType = transportTypes.filter(transportType => transportType.selected)

    // Set Line & Cirle Colour
    let color = '';
    if (route.transportType === "A") {
        color = 'blue'
    } else if (route.transportType === "TB") {
        color = 'red'
    } else if (route.transportType === "TM") {
        color = 'purple'
    }
    const lineOptions = { color: color }
    const cirleOptions = { color: color }


    const handleSelect = (lineId) => {
        if (lineId) {
            navigate(`/lines/${lineId}`)
        }
    }




    return (
        <div>
            {route.stops.map((stop, index) => {
                return (
                    <Circle
                        key={index}
                        center={[stop.location.lat, stop.location.lon]}
                        pathOptions={cirleOptions}
                        radius={30}
                        eventHandlers={{
                            click: () => {
                                handleSelect(lineId)
                            },
                        }}>
                        <Tooltip direction="bottom" offset={[0, 20]} opacity={1} sticky>
                            {stop.name}
                        </Tooltip>
                    </Circle>
                )
            })}
            {route.segments.map((segment, index) => {
                const polylineSegments = [];
                segment.coordinates.forEach((coordinate) => {
                    const segmentCoordinates = [coordinate.lat, coordinate.lon];
                    polylineSegments.push(segmentCoordinates)
                })
                return (
                    <Polyline
                        positions={polylineSegments}
                        pathOptions={lineOptions}
                        key={index}
                        eventHandlers={{
                            click: () => {
                                handleSelect(lineId)
                            },
                        }}
                    />
                )
            })}
        </div>
    )
}

export default Route;