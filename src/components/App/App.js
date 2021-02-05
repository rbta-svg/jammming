import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '/Users/roberttiu/Progetti/jammming/src/util/Spotify/Spotify.js';

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      searchResults: [],

      playlistName: 'Nome della tua playlist',

      playlistTracks: []
    }
  
   


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {
    let isInPlaylistTracks = false;

    this.state.playlistTracks.forEach(trackObj => {
      if (trackObj.id === track.id) isInPlaylistTracks = true;
    });


    if (!isInPlaylistTracks) {
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
      isInPlaylistTracks = false;
    }
  }

  removeTrack(track) {
    let newObjArray = this.state.playlistTracks.filter(trackObj => trackObj.id !== track.id);
    this.setState({ playlistTracks: newObjArray });
  }

  changePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(resolvedPromise => {
      alert('Playlist creata, controlla Spotify!')
      this.setState( {playlistName: 'My new Playlist', playlistTracks: [] }) 
    });
  }

  search(searchTerm) {
    if(searchTerm) {
      Spotify.search(searchTerm).then(value => {
        this.setState({ searchResults: value })
      });
    }
  }
  
  render() {
    return (
      <div>
        <h1>Jam<span className="highlight">ming</span></h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} onChange={this.changePlaylistName} onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  };
}

export default App;
