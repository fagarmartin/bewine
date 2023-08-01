import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>Parece que te has perdido</h2>
      <img
        src="https://www.okchicas.com/wp-content/uploads/2016/06/batalla-Reddit-perro-triste-1.png"
        alt="perdido?"
        width={500}
      />

      <p>VUELVE A CASA</p>
      <Link to={"/"}>Home</Link>
    </div>
  );
}

export default NotFound;
