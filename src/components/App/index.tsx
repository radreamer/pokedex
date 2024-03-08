import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";

import PokemonList from "../PokemonList";
import PokemonItem from "../PokemonItem";

const App: React.FC = (): JSX.Element => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonItem />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
