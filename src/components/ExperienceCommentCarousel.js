import React from "react";

//Kullanıcıların deneyimler hakkında yaptıkları yorumları bootstrap carousel olarak gösterir.
const ExperienceCommentCarousel = ({ commentList }) => {
  return (
    <div
      id="commentCarousel"
      className="carousel slide "
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {commentList.map((comment) => {
          return (
            <div className=" carousel-item active card" key={comment.text}>
              <img
                src={comment.image}
                className="comment-carousel-image d-block w-100 card-img"
                alt="..."
              />
              <div
                className="card-img-overlay d-flex justify-content-center align-items-center  "
                style={{
                  backgroundColor: "rgba(0 , 0 , 0 , 0.5)",
                  color: "#fff",
                }}
              >
                <div className="text-center d-flex flex-column justify-content-center w-75 py-4">
                  <h1 className="card-title">{comment.title}</h1>
                  <p className="card-text fs-4 fst-italic ">{comment.text}</p>
                  <p className="card-text fs-4 fst-italic">{comment.writer}</p>
                </div>
              </div>
            </div>
          );
        })}
        ;
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#commentCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#commentCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ExperienceCommentCarousel;
