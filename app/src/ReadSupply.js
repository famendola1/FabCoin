import React from "react";

class ReadSupply extends React.Component {
  state = { remaining: null };
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.FabCoin;

    const remaining = contract.methods["remaining"].cacheCall();

    this.setState({ remaining });
  }

  render() {
    const { FabCoin } = this.props.drizzleState.contracts;

    const remaining = FabCoin.remaining[this.state.remaining];

    return <h4 className="supply">  Remaining: {remaining && remaining.value} </h4>
  }
}

export default ReadSupply;
