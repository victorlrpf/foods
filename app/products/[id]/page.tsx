import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
    params: {
        id: string
    }
}

const ProductPage = async ({params: {id}}: ProductPageProps) => {
    const product = await db.product.findUnique({
        where: {id},
        include: {
            restaurant: true
        }
    })

    if (!product) {
        return notFound();
    }

    const juice = await db.product.findMany({
        where: {
            category: {
                name: 'Sucos'
            },
            restaurant: {
                id: product.restaurant.id
            }
        },
        include: {
            restaurant: true
        }
    })

    return ( 
        <div>
            {/* IMAGEM */}
            <ProductImage product={product}/>

            {/* INFORMAÇÕES */}
            <ProductDetails product={product} complementaryProducts={juice}/>

        </div>
     );
}
 
export default ProductPage;