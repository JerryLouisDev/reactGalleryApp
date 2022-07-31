// importing all componenets
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import apiKey from "./config";
import Search from "./Components/Search";
import Nav from "./Components/Nav";
import PhotoContainer from "./Components/PhotoContainer";
import NoPage from "./Components/NoPage";

//Initializing state with app class component

class App extends Component {
  constructor() {
    super();

    this.state = {
      photos: [],
      title: "",
      loading: 1,
    };
  }

  //Loading external data when our component gets mounted to the DOM via searchTag function
  componentDidMount() {
    let tag = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    this.searchTag(tag ? tag : null);
  }

  // Requesting data from the Flickr API with API key
  searchTag = (tag) => {
    if (tag) {
      fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=16&format=json&nojsoncallback=1`
      )
        //Formatting the api information into JSON for cleaner research
        .then((res) => res.json())

        .then((response) => {
         
          this.setState({
            photos: response.photos.photo,
            loading: 0,
            title: tag,
          });
        })
        //catching any error 
        .catch((error) => {
          console.log("Error collecting data", error);
        });
    } else {
      this.setState({
        loading: 0,
      });
    }
  };
  //integrate a loading indicator to aim for Exceeds
  manageLoading = (indicator) => {
    this.setState({ loading: indicator });
  };
  //Rendering the default display of photo gallery
  render() {
    return (
      <div>
        <div>
          <Container>
            <h1>Welcome to the Photo Gallery </h1>
            <p>
              This is an app built by your trusted developer Jerry Louis! Feel
              free to search any items you think of!
            </p>
          </Container>
        </div>
        <BrowserRouter>
          <Search
            onSearch={this.searchTag}
            tag={this.state.title}
            setLoading={this.manageLoading}
          />
          <Nav
            searchTag={this.searchTag}
            tag={this.state.title}
            setLoading={this.manageLoading}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PhotoContainer
                  data={this.state.photos}
                  title={this.state.title}
                  loading={this.state.loading}
                  onSearch={() => this.searchTag}
                />
              )}
            />
            <Route
              exact
              path="/search/:tag"
              render={() => (
                <PhotoContainer
                  data={this.state.photos}
                  title={this.state.title}
                  loading={this.state.loading}
                  onSearch={() => this.searchTag}
                />
              )}
            />
            <Route component={NoPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
