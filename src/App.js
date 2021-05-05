import "./App.css";
import { Row, Col, Typography, Card, Input } from "antd";

const { Title } = Typography;
const { Search } = Input;

function App() {
  const onSearch = (value) => {
    console.log(value);
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
              <Card style={styles.card} title="Results for"></Card>
            </Col>
            <Col span={12}>
              <Card style={styles.card} title="Nominations"></Card>
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
};

export default App;
