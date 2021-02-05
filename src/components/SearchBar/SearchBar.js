import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '' };

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.searchTerm);
        console.log(this.state.searchTerm);

    }

    handleTermChange(e) {
        this.setState({ searchTerm: e.target.value });
    }

    componentDidMount() {
        let webUrl = window.location.href;
        let stateMatchUrlBar = webUrl.match(/state=([^&]*)/);

        if (stateMatchUrlBar) {
            let restoredSearchTerm = stateMatchUrlBar[1].replace(/%20/g, ' ');
            document.getElementById('search').value = restoredSearchTerm;
            this.setState( {searchTerm: restoredSearchTerm} );
            this.props.onSearch(restoredSearchTerm);
        }
    }



    render() {
        return (
            <div className="SearchBar">
                <input
                    id="search"
                    placeholder="Inserisci la canzone da cercare"
                    onChange={this.handleTermChange}
                />

                <button
                    className="SearchButton"
                    onClick={this.search}
                > CERCA </button>
            </div>
        )
    }
}

export default SearchBar;