import commerce from '../utils/commerce';
import ProductList from '../components/products/ProductList';
import CategoryList from '../components/categories/categoryList';
import Link from 'next/link';


export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant,
      categories,
      products
    }
  }
}

export default function Home(props) {
  // const { merchant, products, categories } = props;
  return (
    <div>
      <CategoryList categories={props.categories} />
      <ProductList products={props.products} />
    </div>
  )
}
