import Category from './Category';
import Link from 'next/link';
import styles from '../../styles/category.module.css';

const CategoryList = ({ categories }) => {
    if (!categories) return null;

    return (
        <div className={styles.categories}>
                {
                    categories.map((item, i) => (
                        <div className={styles.category_border} key={i}>
                            <div className={styles.category}>
                                <Link href={`/categories/${item.slug}`}>
                                    <a>
                                        <Category {...item} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))
                }
        </div>
    );
}
 
export default CategoryList;