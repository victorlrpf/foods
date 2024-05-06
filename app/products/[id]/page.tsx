import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

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

    return ( 
        <div>
            {/* IMAGEM */}
            <div className="relative h-[360px] w-full">
                <Image 
                src={product?.imageUrl} 
                alt={product?.name} 
                fill 
                className=" object-cover"
                />

                <Button className=" absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white" size='icon'>
                    <ChevronLeftIcon />
                </Button>
            </div>

            {/* INFORMAÇÕES */}
            <div className="p-5">
                {/* RESTAURANTE */}
                <div className="flex items-center gap-1">
                    <div className="relative h-6 w-6">
                        <Image 
                        src={product.restaurant.imageUrl}
                        alt={product.restaurant.name}
                        fill
                        className="rounded-full object-cover"/>
                    </div>
                    <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
                </div>
                {/* PRODUTO */}
                <h1 className="text-xl font-semibold mb-3 mt-1">{product.name}</h1>
                <div className="flex justify-between">
                    <div className="flex items-center">
                    <h2>{formatCurrency(Number(product.price))}</h2>
                    {product.discountPercentage > 0 &&(
                        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
                        <ArrowDownIcon size={12}/>
                        <span className="text-xs font-semibold">
                            {product.discountPercentage}%
                        </span>
                    </div>
                    )}
                    </div>

                </div>
                {/* DESCRIÇÃO */}
                <p className="">{product.description}</p>
            </div>

        </div>
     );
}
 
export default ProductPage;