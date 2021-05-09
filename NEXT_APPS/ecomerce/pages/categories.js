import commerce from '../utils/commerce';
import CategorytList from '../components/categories/categoryList';

export const getStaticProps = async () => {
    const { data: category } = await commerce.category.list();
    return {
        props: {
            category
        }
    }
}
const Category = ({ category }) => {
    return (
        <div>
            <h1>category</h1>
            <CategorytList category={category} />
        </div>
    );
}
 
export default Category;