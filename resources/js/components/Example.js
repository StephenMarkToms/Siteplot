import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            Example React Component
                        </div>

                        <div className="text-red-500">
                            I'm an example component!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

if (document.getElementById('r-app')) {
    ReactDOM.render(<App />, document.getElementById('r-app'))
}
