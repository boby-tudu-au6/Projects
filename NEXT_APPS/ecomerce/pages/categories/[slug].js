import commerce from '../../utils/commerce';
import ProductList from '../../components/products/ProductList';

export const getStaticProps = async ({ params }) => {
    const { slug } = params;
    const category = await commerce.categories.retrieve(slug, { type: 'slug' });
    const { data: products } = await commerce.products.list({
        category_slug: [slug],
    });

    return {
        props: {
            category,
            products
        }
    }
};

export const getStaticPaths = async () => {
    const { data: categories } = await commerce.categories.list();

    return {
        paths: categories.map((item) => ({
            params: {
                slug: item.slug
            }
        })),
        fallback: false
    }
}


const CategoryPage = ({ category, products }) => {
    return (
        <div>
            <h1>{category.name}</h1>
            <ProductList products={products} />
        </div>
    );
}
 
export default CategoryPage;