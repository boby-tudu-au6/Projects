import styles from '../../styles/product.module.css';

export default function products({ name, price, media: {source} }){
    return (
        <div>
            <img src={source} width="100%" />
            <div className={styles.desc}>
                <h2>{name}</h2>
                <h3>{price.formatted_with_symbol}</h3>
            </div>
        </div>
    )
}