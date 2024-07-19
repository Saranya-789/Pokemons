import { Link } from 'react-router-dom';
import PropTypes  from 'prop-types';

const Item = ({ pokemon }) => (
    <div className='card'>
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.sprites.front_default}/>
      </Link>
    </div>
  );

  Item.propTypes = {
    pokemon: PropTypes.shape({
      id: PropTypes.number.isRequired,
      sprites: PropTypes.shape({
        front_default: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };
  export default Item;