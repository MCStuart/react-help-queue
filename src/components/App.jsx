import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Error404 from './Error404';
import Admin from './Admin';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';

import MySampleComponent from './ImageLoaderComponentExample';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: [],
      selectedTicket: null
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }


  updateTicketElapsedWaitTime() {
    console.log("check");
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach((ticket) =>
      ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    );
    this.setState({ masterTicketList: newMasterTicketList })
  }

  handleChangingSelectedTicket(ticket){
    this.setState({selectedTicket: ticket});
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' 
            render={() => 
              <TicketList 
                ticketList={this.state.masterTicketList} />} 
              />
          <Route path='/newticket' 
            render={() => <NewTicketControl />} 
          />
          <Route path='/admin' 
            render={(props)=>
              <Admin 
                ticketList={this.state.masterTicketList} 
                onTicketSelection={this.handleChangingSelectedTicket}
                currentRouterPath={props.location.pathname}
                selectedTicket={this.state.selectedTicket}/>} 
              />
          <Route component={Error404} />
        </Switch>
        <MySampleComponent />
      </div>
    );
  }
}


export default App;