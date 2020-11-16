declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: props.title,
            value: props.value,
            time: props.time
        };
    }
    render(){
        return (
            <>
                {this.state.title}
            </>
        )
    }
}
