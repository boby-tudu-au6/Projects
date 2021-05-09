import commerce from '../utils/commerce';
import ProductList from '../components/products/ProductList';

export const getStaticProps = async () => {
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
            <ProductList Products={products} />
        </div>
    );
}
 
export default Products;