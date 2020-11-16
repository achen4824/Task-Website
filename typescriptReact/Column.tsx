declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
import { useTrail, animated, useSpring, interpolate } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import {Item } from './Item';

const Trail = function(props){
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
        {trail.map(({ x, height, ...rest }, index) => (
            <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
            </animated.div>
        ))}
    </div>
    )
}

const Slider = function(props) {
    const [bind, { delta, down }] = useGesture()
    if(props.name === "ToBeCompleted"){
        var trail = useTrail(props.children.length, {
            x: down && delta[0] > 0 ? delta[0] : 0,
            bg: `linear-gradient(120deg, ${delta[0] < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`,
            size: down ? 1.1 : 1,
            immediate: name => down && name === 'x'
        })
    }else{
        var trail = useTrail(props.children.length, {
            x: down && delta[0] < 0 ? delta[0] : 0,
            bg: `linear-gradient(120deg, ${delta[0] < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`,
            size: down ? 1.1 : 1,
            immediate: name => down && name === 'x'
        }) 
    }

    const avSize = trail[0].x.interpolate({ map: Math.abs, range: [50, 300], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' })
    
    return (
        <>
            {trail.map(({ x, bg, size }, index) => (
            <animated.div {...bind()} class="item" style={{ background: bg }}>
                <animated.div class="av" style={{ transform: avSize, justifySelf: delta[0] < 0 ? 'end' : 'start' }} />
                <animated.div class="fg" style={{ transform: interpolate([x, size], (x, s) => `translate3d(${x}px,0,0) scale(${s})`) }}>
                {props.children}
                </animated.div>
            </animated.div>
            ))}
        </>
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
            <Slider name={name}>
                <Item title={element.name} value={element.value} time={element.time} />
            </Slider>
        );

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
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