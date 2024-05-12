
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";



const TransportTypes = function () {

    const navigate = useNavigate()

    const { transportTypes } = useSelector((state) => state.transportTypes);

    const dispatch = useDispatch()

    const onSelect = (id) => {
        return dispatch({
            type: "transportTypes/selectTransportType",
            payload: id,
        })
    }



    const displayTransportTypes = transportTypes.map((transportType) => (

        <Button style={{ backgroundColor: transportType.color, border: 'none' }} onClick={() => { onSelect(transportType.id); navigate('/') }} key={transportType.id}>{transportType.name}</Button>
    ));

    return (
        <div className="transport-selector-container">
            {displayTransportTypes}
            <Button style={{ backgroundColor: 'gray', border: 'none' }} onClick={() => { onSelect('all'); navigate('/') }} key={4}>Всички</Button>
        </div>
    );

}


export default TransportTypes;