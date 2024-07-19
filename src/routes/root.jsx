import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Item from './item';
import { useSearchParams } from 'react-router-dom';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const fetchPokemon = async (page) => {
    try {
      const offset = (page - 1) * limit;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      const results = data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();
          return details;
        })
      );
      setPokemonList(pokemonData);
      setTotalPages(Math.ceil(data.count / limit)); 
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  const renderPaginationItems = () => {
    let items = [];
    const maxPageDisplay = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
    let endPage = Math.min(totalPages, currentPage + Math.floor(maxPageDisplay / 2));

    if (endPage - startPage < maxPageDisplay - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageDisplay + 1);
      }
    }

    items.push(
      <Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
    );

    items.push(
      <Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1} />
    );

    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      items.push(
        <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next key="next" onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} disabled={currentPage === totalPages} />
    );

    items.push(
      <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
    );

    return items;
  };
  return (
    <>
    <div className='container'>       
      <h2 style={{ fontSize: '3rem' }}>Pokemons</h2>
    </div>
    <Container>
      <Row xs={1} md={2} lg={4} className="g-4">
        {pokemonList.map((pokemon) => (
          <Col key={pokemon.id}>
            <Item pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Pagination className='justify-content-centre'>{renderPaginationItems()}</Pagination>
      </div>
    </Container>
    </>
  );
};

export default PokemonList;

