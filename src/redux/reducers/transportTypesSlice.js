const initialState = {
    transportTypes: [
        {
            id: 1,
            code: "A",
            name: "Автобуси",
            color: 'blue',
            selected: false,
        },
        {
            id: 2,
            code: "TB",
            name: "Тролеи",
            color: 'red',
            selected: false,
        },
        {
            id: 3,
            code: "TM",
            name: "Трамваи",
            color: 'purple',
            selected: false,
        },

    ],
};


const transportTypesReducer = (state = initialState, action) => {
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

export default transportTypesReducer;