import React from "react";

class ReadSupply extends React.Component {
  state = { cap: null, supply: null };
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.FabCoin;

    const cap = contract.methods["cap"].cacheCall();
    const supply = contract.methods["totalSupply"].cacheCall();



    this.setState({ cap, supply });
  }

  render() {
    const { FabCoin } = this.props.drizzleState.contracts;

    const cap = FabCoin.cap[this.state.cap];
    const supply = FabCoin.totalSupply[this.state.supply];

    const remaining = (cap && cap.value) - (supply && supply.value);

    return <h4 className="supply">  Remaining: {remaining} </h4>
  }
}

export default ReadSupply;
