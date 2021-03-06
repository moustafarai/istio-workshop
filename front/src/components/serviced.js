import React, { Component } from 'react';

export class ServiceD extends Component {
  static displayName = ServiceD.name;

  constructor(props) {
    super(props);
    this.state = { service: [], loading: true };
  }

  componentDidMount() {
    this.populateServiceD();
  }

  static renderServiceD(service) {
    return (
      <div className="card mb-4 shadow-sm" >
        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill={service.color} /><text x="50%" y="50%" fill="#eceeef" dy=".3em">{service.name} Version : {service.version}</text></svg>
          <div className="card-body">
            <p className="card-text" >{service.description}</p>
            <p className="card-text" > Version : {service.version}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">Refresh</button>
              </div>
            </div>
          </div>
          </div>);
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ServiceD.renderServiceD(this.state.service);

    return (
      <div>        
        {contents}
      </div>
    );
  }

  async populateServiceD() {
    const response = await fetch('/ServiceD');
    const data = await response.json();
    this.setState({ service: data, loading: false });
  }
}
