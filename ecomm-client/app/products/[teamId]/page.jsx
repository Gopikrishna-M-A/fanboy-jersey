import ProductListing from '../../../components/Home/ProductListing'
import { getProducts, getUniqueCategories } from '@/utils/products';

const page = async({params}) => {
  const products = await getProducts()

  return (
    <ProductListing  products={products} id={params.teamId}  allP={false} />
  )
}

export default page