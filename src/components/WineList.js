import React, { Component } from 'react';
import { fetchWinesFrom } from '../services/Wines';
import { Loader } from './Loader';
import { Link } from 'react-router-dom';

export class WineList extends Component {
  onSelectWine = (e, wineId) => {
    e.preventDefault();
    this.props.onSelectWine(wineId);
  };

  render() {
    if (this.props.region === null) {
      return null;
    }
    return (
      <div className="col s12 m6 l3">
        <h2 className="center-align">Wines</h2>
        <div className="collection">
          {this.props.wines.map(wine => (
            <Link to={`/wines/${wine.id}`}>
              <a
                key={wine.id}
                href="#!"
                onClick={e => this.onSelectWine(e, wine.id)}
                className={[
                  'collection-item',
                  this.props.wine && wine.id === this.props.wine.id ? 'active' : '',
                ].join(' ')}>
                {wine.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export class WineListPage extends Component {
  state = {
    loading: false,
    wineList: [],
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      fetchWinesFrom(this.props.match.params.regionId).then(wineList => {
        this.setState({
          loading: false,
          wineList,
        });
      });
    });
  }

  onSelectWine = (wineId) => {
    this.props.history.push({
      pathname: `${this.props.match.params.regionId}/wines/${wineId}`
    });
  };

  render() {
    if (this.state.loading) {
      return <div className="center-align"><Loader /></div>
    }
    return (
      <WineList
        onSelectWine={this.onSelectWine}
        wines={this.state.wineList} />
    );
  }
}
