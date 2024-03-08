import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";

import { POKEMONS_AMOUNT, POKEMONS_PER_PAGE } from "../../config";
import { PokemonListItem } from "../../interfaces/pokemon-list-item.interface";

import { PokemonState } from "../../store/reducers";
import { fetchPokemonsListData } from "../../store/actions";

const TOTAL_PAGES = Math.ceil(POKEMONS_AMOUNT / POKEMONS_PER_PAGE);

const PokemonList: React.FC = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { pokemonList, loading, error } = useSelector(
    (state: { pokemon: PokemonState }) => state.pokemon
  );

  useEffect(() => {
    const lastPageIndex = TOTAL_PAGES - 1;
    const requestAmount =
      page === lastPageIndex
        ? POKEMONS_AMOUNT - POKEMONS_PER_PAGE * lastPageIndex
        : POKEMONS_PER_PAGE;

    dispatch(fetchPokemonsListData(page * POKEMONS_PER_PAGE, requestAmount));
  }, [dispatch, page]);

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

  return (
    <section>
      <h1 className="my-3">Pokedex</h1>
      <Row className="row-cols-1 row-cols-md-5">
        {pokemonList.map((pokemon: PokemonListItem, index: number) => {
          const imgIndex = page * POKEMONS_PER_PAGE + index + 1;

          return (
            <Col key={pokemon.name} className="mb-4 text-center">
              <Link
                to={`/pokemon/${pokemon.name}?index=${imgIndex}`}
                className="text-decoration-none"
              >
                <Card>
                  <img alt={pokemon.name} src={`/assets/${imgIndex}.png`} />
                  <CardBody className="p-2">
                    <p className="m-0">{pokemon.name}</p>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>

      <div className="d-flex justify-content-center">
        <Pagination>
          {Array(TOTAL_PAGES)
            .fill(0)
            .map((_, index) => (
              <PaginationItem key={index} active={page === index}>
                <PaginationLink tag="button" onClick={() => setPage(index)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
        </Pagination>
      </div>
    </section>
  );
};

export default PokemonList;
