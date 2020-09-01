import React, { Component } from 'react';
import * as WinesService from '../services/Wines';

export class WineApp extends Component {
  state = {
    commentModalOpen: false,
    regions: [],
    selectedRegion: null,
    wines: [],
    selectedWine: null,
  };

  componentDidMount() {
    WinesService.fetchRegions().then(regions => {
      this.setState(
        {
          regions,
          selectedRegion: regions[0],
        },
        () => {
          WinesService.fetchWinesFrom(this.state.selectedRegion).then(wines => {
            this.setState({
              wines,
              selectedWine: wines[0],
            });
          });
        }
      );
    });
  }

  closeCommentModal = () => {
    this.setState({ commentModalOpen: false });
  };

  openCommentModal = () => {
    this.setState({ commentModalOpen: true });
  };

  onSelectRegion = region => {
    WinesService.fetchWinesFrom(region).then(wines => {
      this.setState({ selectedRegion: region, wines, selectedWine: wines[0] });
    });
  };

  onSelectWine = id => {
    WinesService.fetchWine(id).then(wine => {
      this.setState({ selectedWine: wine });
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="center-align">Open Wine Database</h1>
        <div className="center-align">
          You can read the Wines API documentation at{' '}
          <a href="https://bit.ly/rbw-api" target="_blank">
            https://wines-api.herokuapp.com
          </a>{' '}
          and try it{' '}
          <a href="https://bit.ly/rbw-api-swag" target="_blank">
            here
          </a>
        </div>
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}
