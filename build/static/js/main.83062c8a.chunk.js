(this.webpackJsonpjammming=this.webpackJsonpjammming||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a(20)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n,c=a(0),r=a.n(c),s=a(7),i=a.n(s),o=(a(14),a(8)),l=a(2),h=a(3),u=a(1),p=a(5),m=a(4),d=(a(15),a(16),a(17),function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).addTrack=n.addTrack.bind(Object(u.a)(n)),n.removeTrack=n.removeTrack.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"renderAction",value:function(){return this.props.isRemoval?r.a.createElement("button",{className:"Track-action",onClick:this.removeTrack},"-"):this.props.isRemoval?void 0:r.a.createElement("button",{className:"Track-action",onClick:this.addTrack},"+")}},{key:"addTrack",value:function(){this.props.onAdd(this.props.track)}},{key:"removeTrack",value:function(){this.props.onRemove(this.props.track)}},{key:"render",value:function(){return r.a.createElement("div",{className:"Track"},r.a.createElement("div",{className:"Track-information"},r.a.createElement("h3",null,this.props.track.name),r.a.createElement("p",null,this.props.track.artist," | ",this.props.track.album)),this.renderAction())}}]),a}(r.a.Component)),f=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"TrackList"},this.props.tracks.map((function(t){return r.a.createElement(d,{track:t,key:t.id,onAdd:e.props.onAdd,onRemove:e.props.onRemove,isRemoval:e.props.isRemoval})})))}}]),a}(r.a.Component),v=(a(18),function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"SearchResults"},r.a.createElement("h2",null,"Risultati ricerca"),r.a.createElement(f,{tracks:this.props.searchResults,onAdd:this.props.onAdd,isRemoval:!1}))}}]),a}(r.a.Component)),y=(a(19),function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={searchTerm:""},n.search=n.search.bind(Object(u.a)(n)),n.handleTermChange=n.handleTermChange.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"search",value:function(){this.props.onSearch(this.state.searchTerm),console.log(this.state.searchTerm)}},{key:"handleTermChange",value:function(e){this.setState({searchTerm:e.target.value})}},{key:"componentDidMount",value:function(){var e=window.location.href.match(/state=([^&]*)/);if(e){var t=e[1].replace(/%20/g," ");document.getElementById("search").value=t,this.setState({searchTerm:t}),this.props.onSearch(t)}}},{key:"render",value:function(){return r.a.createElement("div",{className:"SearchBar"},r.a.createElement("input",{id:"search",placeholder:"Inserisci la canzone da cercare",onChange:this.handleTermChange}),r.a.createElement("button",{className:"SearchButton",onClick:this.search}," CERCA "))}}]),a}(r.a.Component)),k=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).changeHandler=n.changeHandler.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"changeHandler",value:function(e){this.props.onChange(e.target.value)}},{key:"render",value:function(){return r.a.createElement("div",{className:"Playlist"},r.a.createElement("input",{value:this.props.playlistName,onChange:this.changeHandler}),r.a.createElement(f,{tracks:this.props.playlistTracks,onRemove:this.props.onRemove,isRemoval:!0}),r.a.createElement("button",{className:"Playlist-save",onClick:this.props.onSave},"CREA LA PLAYLIST"))}}]),a}(r.a.Component),b="6fcae6e681ed465d9b593ad989a8b758",T={getAccessToken:function(e){if(n)return n;var t,a=window.location.href,c=a.match(/access_token=([^&]*)/),r=a.match(/expires_in=([^&]*)/);if(c)return n=c[1],t=r[1],window.setTimeout((function(){return n=""}),1e3*t),window.history.pushState("Access Token",null,"/"),console.log("Auth token successfully captured!"),n;window.location=e?"https://accounts.spotify.com/authorize?client_id=".concat(b,"&response_type=token&scope=playlist-modify-public&redirect_uri=").concat("http://rob-frocio.surge.sh","&state=").concat(e):"https://accounts.spotify.com/authorize?client_id=".concat(b,"&response_type=token&scope=playlist-modify-public&redirect_uri=").concat("http://rob-frocio.surge.sh"),console.log("Redirecting to Spotify auth screen")},search:function(e){return fetch("https://api.spotify.com/v1/search?type=track&q=".concat(e),{headers:{Authorization:"Bearer ".concat(this.getAccessToken(e))}}).then((function(e){if(e.ok)return console.log("Successfully got a response for the track fetching"),e.json();throw new Error("Something has gone wrong while fetching the tracks")})).then((function(e){return e.tracks.items.map((function(e){return{id:e.id,name:e.name,artist:e.artists[0].name,album:e.album.name,uri:e.uri}}))}))},savePlaylist:function(e,t){var a,c=this;if(t&&e)return n||this.getAccessToken(),n,fetch("https://api.spotify.com/v1/me",{headers:{Authorization:"Bearer ".concat(this.getAccessToken())}}).then((function(e){return e.json()})).then((function(e){a=e.id,console.log("Fetched UserID: ".concat(a))})).then((function(){return fetch("https://api.spotify.com/v1/users/".concat(a,"/playlists"),{method:"POST",headers:{Authorization:"Bearer ".concat(c.getAccessToken()),"Content-Type":"application/json"},body:JSON.stringify({name:e})})})).then((function(e){return e.json()})).then((function(e){fetch("https://api.spotify.com/v1/playlists/".concat(e.id,"/tracks"),{method:"POST",headers:{Authorization:"Bearer ".concat(c.getAccessToken()),"Content-Type":"application/json"},body:JSON.stringify({uris:t})})}));alert("Missing playlist name or playlist is empty.")}},g=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={searchResults:[],playlistName:"Nome della tua playlist",playlistTracks:[]},n.addTrack=n.addTrack.bind(Object(u.a)(n)),n.removeTrack=n.removeTrack.bind(Object(u.a)(n)),n.changePlaylistName=n.changePlaylistName.bind(Object(u.a)(n)),n.savePlaylist=n.savePlaylist.bind(Object(u.a)(n)),n.search=n.search.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"addTrack",value:function(e){var t=!1;this.state.playlistTracks.forEach((function(a){a.id===e.id&&(t=!0)})),t||(this.setState({playlistTracks:[].concat(Object(o.a)(this.state.playlistTracks),[e])}),t=!1)}},{key:"removeTrack",value:function(e){var t=this.state.playlistTracks.filter((function(t){return t.id!==e.id}));this.setState({playlistTracks:t})}},{key:"changePlaylistName",value:function(e){this.setState({playlistName:e})}},{key:"savePlaylist",value:function(){var e=this,t=this.state.playlistTracks.map((function(e){return e.uri}));T.savePlaylist(this.state.playlistName,t).then((function(t){alert("Playlist creata, controlla Spotify!"),e.setState({playlistName:"My new Playlist",playlistTracks:[]})}))}},{key:"search",value:function(e){var t=this;e&&T.search(e).then((function(e){t.setState({searchResults:e})}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Rob \xe8 proprio",r.a.createElement("span",{className:"highlight"}," frocio")),r.a.createElement("div",{className:"App"},r.a.createElement(y,{onSearch:this.search}),r.a.createElement("div",{className:"App-playlist"},r.a.createElement(v,{searchResults:this.state.searchResults,onAdd:this.addTrack}),r.a.createElement(k,{playlistName:this.state.playlistName,playlistTracks:this.state.playlistTracks,onRemove:this.removeTrack,onChange:this.changePlaylistName,onSave:this.savePlaylist}))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.83062c8a.chunk.js.map