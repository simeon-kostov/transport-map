import { Marker, Popup, Polyline } from "react-leaflet";
import { Icon } from 'leaflet'
import { useSelector } from "react-redux";

// Custom Marker
const customMarkerIcon = new Icon({
    iconUrl: require("../images/full-circle.png"),
    iconSize: [20, 20]
})

// line colour
const lineOptions = { color: 'blue' }


const Route = function ({ route }) {

    const { transportTypes } = useSelector((state) => state.transportTypes);

    const selectedTransportType = transportTypes.filter(transportType => transportType.selected)

    return (
        <div>
            {route.stops.map((stop, index) => {
                return (
                    <Marker position={[stop.location.lat, stop.location.lon]} icon={customMarkerIcon} key={index}>
                        <Popup>
                            {stop.name}
                        </Popup>
                    </Marker>
                )
            })}
            {route.segments.map((segment, index) => {
                const polylineSegments = [];
                segment.coordinates.forEach((coordinate) => {
                    const segmentCoordinates = [coordinate.lat, coordinate.lon];
                    polylineSegments.push(segmentCoordinates)
                })
                return (
                    <Polyline pathOptions={lineOptions} positions={polylineSegments} key={index} />
                )
            })}
        </div>
    )
}

export default Route;