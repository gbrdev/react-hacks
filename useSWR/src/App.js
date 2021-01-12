import React from "react";
import "./styles.css";
import useSWR from "swr";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const fetcher = async (url) => {
  // adicionar header auth
  const res = await fetch("https://httpbin.org" + url);
  const json = await res.json();
  return json;
};

const Home = () => {
  const { data, mutate } = useSWR("/uuid", fetcher);
  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => mutate({ uuid: "tulio" })}>Mutate</button>
    </>
  );
};

const Outra = () => {
  return <h2>Outra</h2>;
};

export default function App() {
  return (
    <div className="App">
      <h1>Exemplo de useSWR</h1>
      <Router>
        <Link to="/">Home</Link> |<Link to="/outra">Outra</Link>
        <Route exact path="/" component={Home} />
        <Route path="/outra" component={Outra} />
      </Router>
    </div>
  );
}
