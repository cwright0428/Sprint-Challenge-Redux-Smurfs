import React, { Component } from 'react';
import './App.css';
import { fetchSmurfs, postSmurf } from '../actions/';
import { connect } from 'react-redux';
/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own.
 Just remember, `how do I `connect` my components to redux?`
 `How do I ensure that my component links the state to props?`
 */


class App extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      age: 100,
      height: '',
    }
  }

  componentDidMount() {
    this.props.fetchSmurfs();
  }

  addSmurf = () => {
    const newSmurf = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height,
    }
    this.props.postSmurf(newSmurf);
    this.setState({
      name: '',
      age: 100,
      height: '',
    })
  }

  handleNewSmurf = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <h1>La La La La La La </h1>
        <div>Welcome to the Smurf Village!</div>
        <div>Come on in and "Smurfify" yourself</div>
        <div>Or add you favorite</div>
        <div>
          {this.props.fetching ? (
            <p>LOADING SMURFS . . . </p>
            ) : (
            <div className="smurfInfo">
              {this.props.smurfs.map(smurf => {
                return (<div key={smurf.name}>
                  <h2>Name: {smurf.name}</h2>
                  <p>age: {smurf.age}</p>
                  <p>height: {smurf.height}</p>
                </div>)
              })}
            </div>
          )}
        </div>
        <form>
          Name:
          <input
            type="text"
            onChange={this.handleNewSmurf}
            value={this.state.name}
            name='name'
          /><br />
          Age:
          <input
            type="number"
            onChange={this.handleNewSmurf}
            value={this.state.age}
            name='age'
          /><br />
          Height:
          <input
            type="text"
            onChange={this.handleNewSmurf}
            value={this.state.height}
            name='height'
          />
        </form>
        <button onClick={ this.addSmurf }>Submit New Smurf</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    error: state.error,
    fetching: state.fetching
  }
}

export default connect(mapStateToProps, { fetchSmurfs, postSmurf })(App);

