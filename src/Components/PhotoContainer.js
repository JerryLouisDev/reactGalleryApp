import React from "react";
import { withRouter } from "react-router-dom";
import NotFound from "./NotFound";
import Photo from "./Photo";

const PhotoContainer = (props) => {
    console.log(props.data);
  let photos = props.data.map((photo) => (
    <Photo
      url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
      key={photo.id}
    />
  ));

  return (
    <div className="photo-container">
      {props.loading ? (
        <p>Loading</p>
      ) : !props.data.length && !props.loading ? (
        <NotFound />
      ) : (
        <div>
          <h2> Image Of: {props.title} </h2>
          <ul> {photos} </ul>
        </div>
      )}
    </div>
  );
};

export default withRouter(PhotoContainer);
