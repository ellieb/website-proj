import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const axios = require("axios");
const { map } = require("lodash/fp");

// TODO: Pagination
// TODO: Tabs to look at other bookshelves
// TODO: Smaller + prettier cards
// TODO: Allow access to anyones google books
const getBookshelfData = async ({ bookshelfId, googleId, apiKey }) => {
  const req = `https://www.googleapis.com/books/v1/users/${googleId}/bookshelves/${bookshelfId}/volumes`;
  try {
    const response = await axios.get(req, {
      params: {
        key: apiKey,
        maxResults: 50
      }
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

class Books extends Component {
  constructor() {
    super();
    this.state = { volumes: [] };
  }

  async componentDidMount() {
    const bookshelfId = "4";
    const googleId = process.env.GOOGLE_ID;
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const bookshelfData = await getBookshelfData({
      bookshelfId,
      googleId,
      apiKey
    });

    console.log("bookshelfData: ", bookshelfData);
    this.setState({ volumes: bookshelfData.items });
  }

  //   <div class="card flex-row flex-wrap">
  //   <div class="card-header border-0">
  //       <img src="//placehold.it/200" alt="">
  //   </div>
  //   <div class="card-block px-2">
  //       <h4 class="card-title">Title</h4>
  //       <p class="card-text">Description</p>
  //       <a href="#" class="btn btn-primary">BUTTON</a>
  //   </div>
  //   <div class="w-100"></div>
  //   <div class="card-footer w-100 text-muted">
  //       FOOTER
  //   </div>
  // </div>

  // <div class="card">
  //   <div class="row no-gutters">
  //       <div class="col-auto">
  //           <img src="//placehold.it/200" class="img-fluid" alt="">
  //       </div>
  //       <div class="col">
  //           <div class="card-block px-2">
  //               <h4 class="card-title">Title</h4>
  //               <p class="card-text">Description</p>
  //               <a href="#" class="btn btn-primary">BUTTON</a>
  //           </div>
  //       </div>
  //   </div>
  //   <div class="card-footer w-100 text-muted">
  //       Footer stating cats are CUTE little animals
  //   </div>
  // </div>

  render() {
    const bookListItem = volumeInfo => (
      <div class="card">
        <div class="row no-gutters">
          <div class="col-3 phn d-none d-sm-block">
            {/* Don't show img in xs */}
            <img
              src={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail}
              class="img-fluid w-100"
              alt={`${volumeInfo.title} book cover`}
            />
          </div>
          <div class="col">
            <div class="card-block px-2">
              <h5 class="card-title">{volumeInfo.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {volumeInfo.authors}
              </h6>
              <p class="card-text overflowed overflowed-ellipsis">
                {volumeInfo.description}
              </p>
              <a href={volumeInfo.infoLink} target="_blank" class="card-link">
                Info Link
              </a>
            </div>
          </div>
        </div>
      </div>
    );

    const books = map(item => (
      <li class="list-group-item" key={item.id}>
        {bookListItem(item.volumeInfo)}
      </li>
    ))(this.state.volumes);

    const cdcs = this.state.volumes.forEach(item => {
      console.log(item.volumeInfo.imageLinks);
    });

    return (
      <Router>
        <div class="container-fluid">
          <h1 class="mvl">Books I Have Read</h1>
          <ul class="list-group list-group-flush">{books}</ul>
        </div>
      </Router>
    );
  }
}
export default Books;
