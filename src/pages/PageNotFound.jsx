import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <h2>Movie Not Found!</h2>
      <p>
        <Link to='/' className='btn load-more'>
          Homepage
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
