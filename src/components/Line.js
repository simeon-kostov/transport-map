import Route from "./Route";

const Line = function ({ line }) {
    return (
        <div>
            {
                line.routes.map((route, index) => {
                    return (
                        <Route route={route} key={index} />
                    )
                })

            }
        </div>
    )
}

export default Line;