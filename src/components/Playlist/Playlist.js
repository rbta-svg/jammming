import React from 'react';
import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                
                <input 
                value={this.props.playlistName} 
                onChange={this.changeHandler}/>

                <TrackList 
                tracks={this.props.playlistTracks} 
                onRemove={this.props.onRemove} 
                isRemoval={true}/>
                    
                <button 
                className="Playlist-save" 
                onClick={this.props.onSave}>
                CREA LA PLAYLIST
                </button>

            </div>)
    }
}

export default Playlist;