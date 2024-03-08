import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Spinner, Table } from "reactstrap";
import { Link } from "react-router-dom";

import { fetchPokemonData } from "../../store/actions";
import { PokemonState } from "../../store/reducers";

const PokemonItem: React.FC = (): JSX.Element => {
  const { name } = useParams<{ name: string }>();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { pokemon, loading, error } = useSelector(
    (state: { pokemon: PokemonState }) => state.pokemon
  );

  const query = new URLSearchParams(search);
  const index = query.get("index");

  useEffect(() => {
    if (name) {
      dispatch(fetchPokemonData(name));
    }
  }, [dispatch, name]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pokemon) {
    return <div>Pokemon {name} not found</div>;
  }

  return (
    <div>
      <h1 className="my-3">
        <Link to="/">Home</Link> / {name}
      </h1>
      <div className="d-flex flex-column flex-md-row">
        <img src={`/assets/${index}.png`} alt={name} />
        <Table size="sm">
          <tbody>
            <tr>
              <td>Types:</td>
              <td>
                {pokemon.types.map((item: any) => item.type.name).join(", ")}
              </td>
            </tr>
            <tr>
              <td>Height:</td>
              <td>{pokemon.height}</td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>{pokemon.weight}</td>
            </tr>
            <tr>
              <td>HP:</td>
              <td>
                {pokemon.stats.find((item: any) => item.stat.name === "hp")
                  ?.base_stat || "n/a"}
              </td>
            </tr>
            <tr>
              <td>Attack:</td>
              <td>
                {pokemon.stats.find((item: any) => item.stat.name === "attack")
                  ?.base_stat || "n/a"}
              </td>
            </tr>
            <tr>
              <td>Defense:</td>
              <td>
                {pokemon.stats.find((item: any) => item.stat.name === "defense")
                  ?.base_stat || "n/a"}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PokemonItem;
