import React from 'react';
import ReactAdd from 'react/addons';
import { Link } from 'react-router';
import { version } from '../../package.json';
const Immutable = require('immutable');
const Perf = require('react-addons-perf')
window.React = Perf;

const Vue = require('vue')
new Vue({
  el: '#vue',
  data: {
    debug: true,
    enps: []
  },
  created() {
    for (var i = 0; i < 10000; i++) {
    	this.enps.push({checked: false, name: "Node " + i})
    }
  },
  methods: {
    loadUsers() {
      for (var i = 0; i < 10000; i++) {
      	this.enps.push({checked: false, name: "Node " + i})
      }
    },
    clickAll() {
      this.enps.map((o)=> {
        o.checked = !o.checked
      })
    },
  }
})



var Checkbox = React.createClass({
  getInitialState() {
    return { checked: false }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true
  },
  onClick() {
    this.state.checked = true
  },
  render() {
    return (
        <div>
          <input type="checkbox" checked={this.props.endpoint.checked} onClick={this.onClick}/>{this.props.endpoint.name}
        </div>
    )
  }
})

var List = React.createClass({
  getInitialState() {

  	var endpoints = []
    for (var i = 0; i < 10000; i++) {
    	endpoints.push({checked: false, name: "Node " + i})
    }
    return {
      enps: Immutable.fromJS(endpoints).toJS(),
      loaded: false,
    }
  },

  selectAll() {
    this.setState({
      enps: Immutable.fromJS(this.state.enps).map(enp => enp.set('checked', !enp.get('checked'))).toJS()
    })
  },
  componentDidMount() {
  },
	render() {
    const lists = this.state.enps.map((enp, idx)=> {
      return (
        <div key={idx}>
          <Checkbox endpoint={enp}/>
        </div>
      )
    })

    return (
      <div>
        <h1>React</h1>
        <input type="checkbox" onChange={this.selectAll}/>Select All
        {lists}
      </div>
    )
  }
});


const App = ({ children }) => (
  <div>
	<List/>
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
