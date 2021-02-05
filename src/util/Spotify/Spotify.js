let accessToken;
const clientID = ''; // ommitted for obvious
const redirectURI = ''

let Spotify = {
    getAccessToken(searchTerm) {
        if (accessToken) {
            return accessToken;
        }
        else {  
            let urlInBrowser = window.location.href;
            let accessTokenMatch = urlInBrowser.match(/access_token=([^&]*)/);
            let expiresInMatch = urlInBrowser.match(/expires_in=([^&]*)/);
            let expiresIn;

            if (accessTokenMatch) {
                accessToken = accessTokenMatch[1];
                expiresIn = expiresInMatch[1];

                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');

                console.log('Auth token successfully captured!')
                return accessToken;
            }

            else {
                if(searchTerm) {
                    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}&state=${ ter}`;
                } else {
                    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
                }
                console.log('Redirecting to Spotify auth screen');
            }
        }
    },

    search(searchTerm) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
            {
                headers: { 'Authorization': `Bearer ${this.getAccessToken(searchTerm)}` }
            })
            .then(response => {

                if (response.ok) {
                    console.log('Successfully got a response for the track fetching')
                    return response.json();
                }
                else {
                    throw (new Error('Something has gone wrong while fetching the tracks'));
                }
            })
            .then(responseJson => {
        
                return responseJson.tracks.items.map(track => {

                    let fetchedTrackObj = {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                    return fetchedTrackObj;
                })
            })
    },

    savePlaylist(playlistName, playlistURIs) {

        if (playlistURIs && playlistName) {
            let accessTokenVar;
            if (accessToken) {
                accessTokenVar = accessToken
            } else {
                this.getAccessToken();
                accessTokenVar = accessToken;
            }
            let userID;

            return fetch('https://api.spotify.com/v1/me',
                {
                    headers: { 'Authorization': `Bearer ${this.getAccessToken()}` }
                })
                
                .then(response => {
                    return response.json();
                })
                
                .then(responseJson => {
                    userID = responseJson.id;
                    console.log(`Fetched UserID: ${userID}`);
                })
                
                .then( () => {
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.getAccessToken()}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: playlistName

                    }),
                })})

                .then(playlistResponse => {
                    return playlistResponse.json();
                })

                .then(playlistResponseJson => {
                    
                    fetch(`https://api.spotify.com/v1/playlists/${playlistResponseJson.id}/tracks`,
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${this.getAccessToken()}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                uris: playlistURIs,
                            })
                        })
                })

        } 

        else {
            alert('Missing playlist name or playlist is empty.');
        }
    }
}

export default Spotify;

