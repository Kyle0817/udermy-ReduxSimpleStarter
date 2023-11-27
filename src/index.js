import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import ViedoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCNyDtHDrLYUjSiys5fISxkrpNGD1t-i_Q';

// create a new component. this component should produce some html

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('羽毛球教學');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

        return ( 
            <div>
                <SearchBar onSearchTermChange={videoSearch}></SearchBar>
                <VideoDetail video={this.state.selectedVideo}></VideoDetail>
                <ViedoList 
                    videos={this.state.videos}
                    onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }>
                </ViedoList>
            </div> 
        )
    }
}

// take this component′s generated html  and put it on the page (in the dom)
ReactDOM.render(<App />, document.querySelector('.container'));
