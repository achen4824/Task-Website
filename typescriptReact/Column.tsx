declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
import { useTrail, animated } from 'react-spring';
import {Item } from './Item';

const Trail = function(props){
    console.log(props.children)
    const items = props.children;
    const open = props.open;
    

    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2000, friction: 200 },
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? 50 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    })

    return (
    <div className="trails-main">
        <div>
        {trail.map(({ x, height, ...rest }, index) => (
            <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
            </animated.div>
        ))}
        </div>
    </div>
    )
  }

export class Column extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            isLoaded: false,
            tasks: [],
            error: null,
            open: true
        };
    }


    componentDidMount() {
        fetch("/tasks")
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
        const { error, isLoaded, tasks, name, open } = this.state;
        const ptr =  this;
        const taskshtml = tasks.map((element) => 
            <Item title={element.name} value={element.value} time={element.time} />
        );

        console.log(taskshtml);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log("RUN")
            return(
                <div class="column">
                    <h2>{name}</h2>
                    <Trail open={open} onClick={()=>{ptr.setState({open: !open})}}>
                        {taskshtml}
                    </Trail>
                </div>
            );
        }
    }
}