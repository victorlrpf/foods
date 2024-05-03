import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                };
            };
        };
    }>;
    classBane?: string;
}


const ProductItem = ({product}: ProductItemProps) => {
    return (  
        <div className="w-[150px] h-[150px] space-y-2">
            <div className="w-full h-[150px] relative ">
                <Image 
                src={product.imageUrl}
                alt={product.name} 
                fill
                className=" object-cover rounded-lg shadow-md"
                />

                {product.discountPercentage && (
                    <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
                        <ArrowDownIcon size={12}/>
                        <span className="text-xs font-semibold">{product.discountPercentage}%</span>
                    </div>
                )}
            </div>


            <div>
                <h2 className="text-sm truncate ">{product.name}</h2>
                <div className="flex gap-1 items-center">
                    <h3 className="font-semibold">
                        {formatCurrency(calculateProductTotalPrice(product))}
                    </h3>
                    {product.discountPercentage > 0 && (
                        <span className=" line-through text-muted-forenround text-xs">
                            {formatCurrency(calculateProductTotalPrice(product))}
                        </span>
                    )}
                </div>

                <span className="block text-xs text-muted-foreground">{product.restaurant.name}</span>
            </div>
        </div>
    );
}
 
export default ProductItem;