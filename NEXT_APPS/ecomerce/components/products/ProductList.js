import Link from 'next/link';
import Product from './Products';
import styles from '../../styles/product.module.css';


export default function ProductList({ products }){
    if (!products) return null;
    console.log(products)
    return (
        <div className={styles.products}>
            {
                products.map((item, i) => (
                    <div className={styles.product_border} key={i}>
                        <div className={styles.product}>
                            <Link href={`/products/${item.permalink}`}>
                                <a>
                                    <Product {...item} />
                                </a>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}