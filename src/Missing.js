import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <p>Disaponting...</p>
      <p>
        <Link to="/">Visit to our Homepage</Link>
      </p>
    </main>
  );
};

export default Missing;
