import React from "react";
import logo from './logo.svg';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import ReadSupply from "./ReadSupply";
import Claim from "./Claim";

class App extends React.Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <Jumbotron className = "App text-light" >
        <h1> FabCoin </h1>
        <ReadSupply
          drizzle = { this.props.drizzle }
          drizzleState = { this.state.drizzleState }
        />
        <Claim
          drizzle = { this.props.drizzle }
          drizzleState = { this.state.drizzleState }
        />
      </Jumbotron>
    );
  }
}

export default App;
