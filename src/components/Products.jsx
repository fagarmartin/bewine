import { Button } from "react-bootstrap";
import CardProducts from "./CardProducts";



function Products({filteredProducts,navigationButton}) {
  return (
    <section id="products">
    <div className="grid-products">
      {filteredProducts.map((eachProduct) => {
        return (
          <div key={eachProduct.id}>
            <CardProducts cardProduct={eachProduct} />
            
          </div>
        );
      })}
    </div>
    <div className="load-more">
   <Button onClick={navigationButton}  >Load more</Button>
   </div>
  </section>
  )
}

export default Products