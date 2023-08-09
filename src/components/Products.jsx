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
   <Button onClick={navigationButton}  >Load more</Button>
  </section>
  )
}

export default Products