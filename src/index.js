import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import _ from "lodash";

import SearchBar from "./components/search_bar";
import ViedoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const UDEMY_API_KEY = "AIzaSyDGDcrRGYoEq9bwkro0guXkhLg4YwTGvvc";

// create a new component. this component should produce some html
/**
 * state: 普通的javascript物件，用於紀錄和響應用戶事件
 *        基於class component都有自已的state object (functional component沒有state object)
 *        只要組件狀態更改，該組件就會立即呈現，並強制所有子組件也呈現。
 */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.videoSearch("羽毛球教學");
  }

  videoSearch(term) {
    YTSearch({ key: UDEMY_API_KEY, term: term }, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}></SearchBar>
        <VideoDetail video={this.state.selectedVideo}></VideoDetail>
        <ViedoList
          // props ↓
          videos={this.state.videos}
          // update state, update select video ↓
          onVideoSelect={(selectedVideo) =>
            this.setState({ selectedVideo })
          }></ViedoList>
      </div>
    );
  }
}

// take this component′s generated html  and put it on the page (in the dom)
ReactDOM.render(<App />, document.querySelector(".container"));
