import React from "react";

import VideoListItem from "./video_list_item";

const ViedoList = ({ videos, onVideoSelect }) => {
  const videoItem = videos.map((video) => {
    return (
      <VideoListItem
        // unique key
        key={video.etag}
        video={video}
        onVideoSelect={onVideoSelect}></VideoListItem>
    );
  });

  return <ul className="col-md-4 list-group">{videoItem}</ul>;
};

export default ViedoList;
