import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

function Ticket(props) {
  var ticketStyle = {
    display: 'flex',
    margin: '.5rem'
  };
  var locationStyle = {
    alignItems: 'flex-start',
    padding: '1rem'
  };
  var namesStyle = {
    alignItems: 'flex-start',
    padding: '1rem'
  };
  var issueStyle = {
    marginLeft: 'auto',
    padding: '1rem'
  };
  const ticketInformation =
    <div style={ticketStyle}>
      <style jsx>{`
        div {
          background-color: red;
        }
      `}</style>
      <h3 style={locationStyle}>{props.location}</h3>
      <h3 style={namesStyle}>{props.names}</h3>
      <h4 style={namesStyle}>{props.formattedWaitTime} ago</h4>
      <p style={issueStyle}><em>{props.issue}</em></p>
    </div>;
  if (props.currentRouterPath === '/admin'){
    return (
      <div onClick={() => {props.onTicketSelection({names: props.names, location: props.location, issue: props.issue, waitTime: props.formattedWaitTime});}}>
        {ticketInformation}
      </div>
    );
  } else {
    return (
      <div>
        {ticketInformation}
      </div>
    );
  }
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string.isRequired,
  currentRouterPath: PropTypes.string,
  onTicketSelection: PropTypes.func
};

export default Ticket;