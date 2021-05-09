import commerce from '../utils/commerce';
import ProductList from '../components/ProductList';

export async function getStaticProps(){
    const { data: products } = await commerce.products.list();
    return {
        props: {
            products
        }
    }
}


const Products = ({ products }) => {
    return (
        <div>
            <h1>Products</h1>
            <ProductList products={products} />
        </div>
    );
}
 
export default Products;