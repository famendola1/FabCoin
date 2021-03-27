import React from "react";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

class Claim extends React.Component {
  state = { claim: null, show: true };

  handleClick = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.FabCoin;

    const claim = contract.methods["claim"].cacheSend({
      from: drizzleState.accounts[0]
    });

    this.setState({ claim });
  }

  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;

    const txHash = transactionStack[this.state.claim];

    if (!txHash) return null;

    if (this.state.show) {
      if (!transactions[txHash]) return (
        <Alert dismissible variant="info" onClose={() => this.setState({ show:false })}>
          <Alert.Heading>Transaction Pending</Alert.Heading>
          <p>Claiming FabCoin...</p>
        </Alert>
      );

      console.log(transactions[txHash]);
      if (transactions[txHash].status === "error") {
        return (
          <Alert dismissible variant="danger" onClose={() => this.setState({ show:false })}>
            <Alert.Heading>Transaction Error</Alert.Heading>
            <p>Unable to claim FabCoin</p>
          </Alert>
        );
      } else if (transactions[txHash].status === "pending" ) {
        return (
          <Alert dismissible variant="info" onClose={() => this.setState({ show:false })}>
            <Alert.Heading>Transaction Pending</Alert.Heading>
            <p>Claiming FabCoin...</p>
          </Alert>
        );
      } else if (transactions[txHash].status === "success") {
        return (
          <Alert dismissible variant="success" onClose={() => this.setState({ show:false })}>
            <Alert.Heading>Success!</Alert.Heading>
            <p>FabCoin claimed successfully!</p>
          </Alert>
        );
      }
    }

    return null;
  };

  render() {
    return (
      <div className="claim">
        <Button onClick={() => this.handleClick()} size="lg">Claim</Button>
        <div className="alert"> { this.getTxStatus() } </div>
      </div>
    );
  }
}

export default Claim;
