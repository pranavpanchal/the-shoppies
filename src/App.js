import React, { useState, useEffect } from "react";

import "./App.css";

import { message, Row, Col, Typography, Card, Input, Button } from "antd";

const { Title } = Typography;
const { Search } = Input;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState();
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=851b1493&type=movie&s=${query}`)
      .then((res) => res.json())
      .then((json) => setMovies(json.Search));
  }, [query]);

  useEffect(() => {
    if (nominations.length >= 5) {
      message.success("Your nominations are good to go!");
    }
  }, [nominations]);

  const onSearch = (value) => {
    setQuery(value);
  };

  const handleClick = (movie) => {
    if (nominations.includes(movie)) {
      setNominations(
        nominations.filter((item) => movie.imdbID !== item.imdbID)
      );
    } else {
      setNominations((prevState) => [...prevState, movie]);
      console.log();
    }
  };

  return (
    <div className="App">
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Title style={styles.title}>The Shoppies</Title>
          <Card style={styles.card} title="Movie Title">
            <Search placeholder="search..." onSearch={onSearch} />
          </Card>
          <Row>
            <Col span={12}>
              <Card style={styles.card} title={`Results for "${query}"`}>
                <ul>
                  {movies &&
                    movies.map((movie) => {
                      return (
                        <li key={movie.imdbID} style={styles.li}>
                          {`${movie.Title} (${movie.Year})`}{" "}
                          <Button
                            disabled={
                              nominations.includes(movie) ||
                              nominations.length >= 5
                            }
                            onClick={() => handleClick(movie)}
                          >
                            Nominate
                          </Button>
                        </li>
                      );
                    })}
                </ul>
              </Card>
            </Col>
            <Col span={12}>
              <Card style={styles.card} title="Nominations (Select up to 5)">
                <ul>
                  {nominations &&
                    nominations.map((nomination) => {
                      return (
                        <li key={nomination.imdbID} style={styles.li}>
                          {`${nomination.Title} (${nomination.Year})`}{" "}
                          <Button onClick={() => handleClick(nomination)}>
                            Remove
                          </Button>
                        </li>
                      );
                    })}
                </ul>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
}

const styles = {
  title: {
    marginTop: "10%",
  },
  card: {
    margin: "0.8vh",
  },
  li: {
    marginBottom: "2%",
  },
};

export default App;
