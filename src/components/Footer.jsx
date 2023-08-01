import ironWineImg from "../assets/ironwine.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <footer className="text-white py-2">
        <div className="container">
          <nav className="row">
            <div className="col-12 col-md-3 d-flex aling-items-center justyfy-content-center">
              <img src={ironWineImg} alt="logo" className="mx-2" height={90} />
            </div>
            <ul className="col-12 col-md-3 list-unstyled">
              <li className="font-weight-bold mb-2">IRONWINE</li>
              <li className="text-center">Tu tienda de vinos online</li>
            </ul>

            <ul className="col-12 col-md-3 list-unstyled">
              <li className="font-weight-bold mb-2">ATENCIÓN AL CLIENTE</li>
              <li className="text-center">L-J 9 a 18 / V 9 a 15</li>
              <li className="text-center">
                <i className="bi bi-telephone" /> 900 000 000
              </li>
              <li className="text-center">
                <i className="bi bi-envelope-at" /> info@ironwine.es
              </li>
            </ul>
            <ul className="col-12 col-md-3 list-unstyled">
              <li className="font-weigth-bold mb-2">SIGUENOS</li>

              <li className="d-flex justify-content-between">
                <Link to={"https://www.facebook.com/"} className="text-reset">
                  {" "}
                  <i className="bi bi-facebook" />{" "}
                </Link>
                <Link to={"https://www.instagram.com/"} className="text-reset">
                  {" "}
                  <i className="bi bi-instagram" />
                </Link>
                <Link to={"https://twitter.com/"} className="text-reset">
                  {" "}
                  <i className="bi bi-twitter" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
