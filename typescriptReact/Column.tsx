declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export class Column extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            isLoaded: false,
            tasks: [],
            error: null
        };
    }

    componentDidMount() {
        fetch("/tasks")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                    isLoaded: true,
                    tasks: result.tasks
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                    isLoaded: true,
                    error
                    });
                }
            )
    }

    render(){
        const { error, isLoaded, tasks, name } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div class="column">
                    <h2>{name}</h2>
                    <ul>
                        {tasks.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                </div>
            );
        }
    }
}