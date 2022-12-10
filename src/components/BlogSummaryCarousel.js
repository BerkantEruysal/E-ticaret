import React from "react";
import { Link } from "react-router-dom";

//Admin tarafından seçilmiş olan blogların, ana sayfada özet şeklinde gösterildiği bir carousel.
const BlogSummaryCarousel = ({ blogList }) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide carousel-dark"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {blogList.map((blog) => {
          return (
            <div key={blog.header} className="carousel-item active">
              <div
                className="card mb-3 w-100"
                style={{ backgroundColor: "#caedff" }}
              >
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src={blog.image}
                      className="img-fluid rounded-start"
                      alt="Blog"
                    />
                  </div>
                  <div className="col-md-6 ">
                    <div className="card-body text-center d-flex flex-column justify-content-around align-items-center h-100">
                      <p className="h2">{blog.header}</p>
                      <p className="card-text w-75 fs-5">{blog.summary}</p>
                      <Link
                        className="btn text-white rounded-pill fs-4 py-2 px-4"
                        style={{ backgroundColor: "#2532a3" }}
                        to="#"
                      >
                        {blog.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default BlogSummaryCarousel;
