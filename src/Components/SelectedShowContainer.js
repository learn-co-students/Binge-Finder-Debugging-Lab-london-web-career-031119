import React, { Component } from 'react';
import Episode from './Episode';

class SelectedShowContainer extends Component {

  state = {
    selectedSeason: 1,
  }

  mapSeasons = () => {
    if (this.props.episodes){
      let seasons = unique(this.props.episodes.map((e)=> e.season))
      return seasons.map(season => {
        return (<option value={season} key={season}>Season {season}</option>)
      });
    }
  }

  mapEpisodes = () =>
    this.props.episodes
      .filter( e => e.season === this.state.selectedSeason)
      .map(e => <Episode episode={e} key={e.id}/> )

  handleSelectionChange = (e) => {
    this.setState({ selectedSeason: parseInt(e.target.value) })
  }

  render() {
    const { selectedShow } = this.props

    return (
      <div style={{position: "static"}}>
        <h2>{selectedShow.name}</h2>
        <img src={selectedShow.image.medium} alt=""/>
        <p dangerouslySetInnerHTML={{__html: selectedShow.summary}}></p>
        <p>Premiered: {selectedShow.premiered}</p>
        <p>Status: {selectedShow.status}</p>
        <p>Average Rating: {selectedShow.rating.average}</p>
        <select style={{display: 'block'}} onChange={this.handleSelectionChange} value={this.state.selectedSeason}>
          {this.mapSeasons()}
        </select>
          {this.mapEpisodes()}
      </div>
    );
  }

}

export default SelectedShowContainer;


function unique(array) {
  var arr = [];
  for(var i = 0; i < array.length; i++) {
    if(!arr.includes(array[i])) {
        arr.push(array[i]);
    }
  }
  return arr;
}
