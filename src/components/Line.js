import Route from "./Route";

const Line = function ({ line, lineId }) {
    return (
        <div>
            {
                line.routes.map((route, index) => {
                    return (
                        <Route route={route} key={index} lineId={lineId} />
                    )
                })

            }
        </div>
    )
}

export default Line;