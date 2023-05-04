import React, { Component } from 'react';
import RestChart from './RestChart';
import StatusChart from './StatusChart';
import AdminMenu from './AdminMenu';


class Diagrams extends Component {
  render() {
    return (
        <>
      <AdminMenu />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div>
          <RestChart />
        </div>
        <div>
          <StatusChart />
        </div>
      </div>
    </>);
  }
}

export default Diagrams;
