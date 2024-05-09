
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";



const TransportTypes = function () {

    const { transportTypes } = useSelector((state) => state.transportTypes);

    const dispatch = useDispatch()

    const onSelect = (id) => {
        return dispatch({
            type: "transportTypes/selectTransportType",
            payload: id,
        })
    }



    const displayTransportTypes = transportTypes.map((transportType) => (
        <Button onClick={() => onSelect(transportType.id)} key={transportType.id}>{transportType.name}</Button>
    ));
    return <div>{displayTransportTypes}</div>;

}


export default TransportTypes;