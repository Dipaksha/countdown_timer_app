import "./App.css";
import { Container } from "@material-ui/core";
import Stopwatch from "./countdown_time/Countdown";

function App() {
  return (
    <Container maxWidth="md">
      <h1 style={{ textAlign: "center" }}>Stopwatch</h1>
      <Stopwatch />
    </Container>
  );
}

export default App;
