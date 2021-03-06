import React, { useState, useEffect } from "react";
import "./App.css";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { message, Row, Col, Typography, Card, Input, Button } from "antd";
import ReactConfetti from "react-confetti";

const { Title } = Typography;
const { Search } = Input;

function App(props) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [page, setPage] = useState(1);
  const [resp, setRes] = useState("True");
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?apikey=851b1493&page=${page}&type=movie&s=${query}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.Error === "Movie not found!") {
          message.error(json.Error);
        }
        setRes(json.Response);
        setMovies([]);
        setMovies(json.Search);
      });
  }, [query, page]);

  useEffect(() => {
    if (nominations.length >= 5) {
      message.success("Your nominations are good to go!");
    }
  }, [nominations]);

  const onSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handlePagination = (ord) => {
    if (ord === "increment") {
      setPage((prevState) => prevState + 1);
    } else if (ord === "decrement" && page > 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  const hasItem = (item) => {
    for (let nom of nominations) {
      if (nom.imdbID === item.imdbID) {
        return true;
      }
    }
  };

  const handleNomination = (movie) => {
    if (hasItem(movie)) {
      setNominations(
        nominations.filter((item) => movie.imdbID !== item.imdbID)
      );
    } else {
      setNominations((prevState) => [...prevState, movie]);
    }
  };

  const submitNoms = () => {
    setConfetti(true);
    message.success("Submitted!");
    setNominations([]);
    setQuery("");
    setPage(1);
    setTimeout(() => {
      setConfetti(false);
    }, 3000);
  };

  return (
    <div className="App">
      <Row>
        <Col span={4}></Col>
        {confetti && (
          <ReactConfetti
            recycle={false}
            gravity={0.4}
            run={confetti}
            numberOfPieces={400}
            {...props.size}
          />
        )}
        <Col span={16}>
          <Title style={styles.title}>???? The Shoppies</Title>
          <Card style={styles.card} title="Movie Title">
            <Search placeholder="search..." onSearch={onSearch} />
          </Card>
          <Row>
            <Col span={12}>
              <Card
                style={styles.card}
                title={
                  <span>
                    {`Results for "${query}"`}
                    <span style={{ float: "right" }}>
                      <Button
                        shape="circle"
                        icon={<LeftOutlined />}
                        disabled={page < 2 || query === ""}
                        onClick={() => handlePagination("decrement")}
                      />
                      {` ${page} `}
                      <Button
                        disabled={resp === "False"}
                        shape="circle"
                        icon={<RightOutlined />}
                        onClick={() => handlePagination("increment")}
                      />
                    </span>
                  </span>
                }
              >
                <ul>
                  {movies &&
                    movies.map((movie) => {
                      return (
                        <li key={movie.imdbID} style={styles.li}>
                          {`${movie.Title} (${movie.Year})`}{" "}
                          <Button
                            disabled={hasItem(movie) || nominations.length >= 5}
                            onClick={() => handleNomination(movie)}
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
                          <Button onClick={() => handleNomination(nomination)}>
                            Remove
                          </Button>
                        </li>
                      );
                    })}
                </ul>
              </Card>
              {nominations.length >= 5 && (
                <>
                  <Row style={styles.card}>
                    <Col span={24}>
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={submitNoms}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
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
