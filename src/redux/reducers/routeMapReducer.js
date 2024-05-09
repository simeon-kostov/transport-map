// State Object
const initialState = {
    transportTypes: [
        {
            id: 1,
            code: "A",
            name: "Автобуси",
            selected: false,
        },
        {
            id: 2,
            code: "TB",
            name: "Тролеи",
            selected: false,
        },
        {
            id: 3,
            code: "TM",
            name: "Трамваи",
            selected: false,
        },

    ],
};

// Define Reducer Logic
const routeMapReducer = (state = initialState, action) => {
    switch (action.type) {
        // Logic for Selecting Transport Type
        case "transportTypes/selectTransportType":
            return {
                ...state,
                transportTypes: state.transportTypes.map((transportType) => {
                    if (transportType.id === action.payload) {
                        return {
                            ...transportType,
                            selected: true,
                        };
                    } else {
                        return {
                            ...transportType,
                            selected: false
                        };
                    }
                }),
            };
        default:
            return state;
    }
};

export default routeMapReducer;