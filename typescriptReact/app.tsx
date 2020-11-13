declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

import { Column } from './Column';
import { Display } from './Display';

export default class Main extends React.Component {
    render() {
        return (
            <div id="container">
                <Column name="ToBeCompleted" />
                <Column name="Done" />
                <Display initialdisplay="graph" />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
