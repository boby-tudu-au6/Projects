import commerce from '../../utils/commerce';
import styles from '../../styles/product.module.css';
import { useCartDispatch, useCartState } from '../../context/cart';

export const getStaticProps = async ({ params }) => {
    const { permalink } = params;
    const product = await commerce.products.retrieve(permalink, {
        type: "permalink"
    });
    return {
        props: {
            product
        }
    }
};

export const getStaticPaths = async () => {
    const { data: products } = await commerce.products.list();
    return {
        paths: products.map((item) => ({
            params: {
                permalink: item.permalink
            }
        })),
        fallback: false
    }
}

const ProductPage = ({ product }) => {
    const {setCart} = useCartDispatch();
    const cart = useCartState();
    console.log(product)
    const addToCart = async () => {
        const {cart} = await commerce.cart.add(product.id)
        setCart(cart);
    }
    return (
        <div className={styles.detail}>
            <div className={styles.detail_img}>
                <img style={{ borderRadius: "12px" }} src={product.media.source} width="100%" />
            </div>
            <div className={styles.detail_txt}>
                <h1 className={styles.text}>{product.name}</h1>
                <p className={styles.text}>{product.price.formatted_with_symbol}</p>
                <p className={styles.text}>{(product.description).replace("<p>", "").replace("</p>", "")}</p>
                <button className={styles.button} onClick={addToCart}>Add to cart</button>
            </div>
        </div>
    );
}
 
export default ProductPage;