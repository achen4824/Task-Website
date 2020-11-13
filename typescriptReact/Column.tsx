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
        fetch("/"+this.state.name+"tasks")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                    isLoaded: true,
                    tasks: result
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
        const taskshtml = tasks.map((element) => 
            <h3>{element.name} {element.value}</h3>
        );

        console.log(taskshtml);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div>
                    <h2>{name}</h2>
                    {taskshtml}
                </div>
            );
        }
    }
}