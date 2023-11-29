import React, { Component } from "react";

// class Component
class SearchBar extends Component {
  // 定義狀態或初始化狀態的方式
  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          // event: 所有原生元素觸發的瀏覽器事件(不用刻意命名為event, 參數可以是任何名稱)
          onChange={(event) => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
