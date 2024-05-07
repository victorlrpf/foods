"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>;
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true;
        }
    }>[];
}

const ProductDetails = ({product, complementaryProducts}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrementQuantityClick = () => setQuantity(currentState => currentState + 1);
    const handleDecrementQuantityClick = () => setQuantity(currentState => {
        if (currentState === 1) return 1;
        
        return currentState - 1
    });

    return ( 
        <div className="relative z-50 py-5 rounded-tl-3xl mt-[-1.5em] rounded-tr-3xl bg-white">
                {/* RESTAURANTE */}
                <div className="flex items-center gap-1 px-5">
                    <div className="relative h-6 w-6">
                        <Image 
                        src={product.restaurant.imageUrl}
                        alt={product.restaurant.name}
                        fill
                        className="rounded-full object-cover"/>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {product.restaurant.name}
                    </span>
                </div>
                {/* PRODUTO */}
                <h1 className="text-xl font-semibold mb-3 mt-1 px-5">
                    {product.name}
                </h1>
                <div className="flex justify-between px-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className=" text-xl font-semibold">
                                {formatCurrency(calculateProductTotalPrice(product))}
                            </h2>
                            {product.discountPercentage > 0 &&(
                                <DiscountBadge product={product}/>
                            )}
                        </div>
                        <p className=" text-muted-foreground text-sm">
                            De: {formatCurrency(Number(product.price))}
                        </p>
                    </div>
                    {/* Quantidade */}
                    <div className="flex gap-3 items-center">
                        <Button
                        size='icon'
                        variant='ghost'
                        className=" border border-muted-foreground border-solid"
                        onClick={handleDecrementQuantityClick}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <span className="w-4">
                            {quantity}
                        </span>
                        <Button
                        size='icon'
                        onClick={handleIncrementQuantityClick}
                        >
                            <ChevronRightIcon />

                        </Button>
                    </div>
                </div>
                {/* CARD */}
                <div className="px-5">

                    <Card className="flex justify-around py-2 mt-6">
                        {/* CUSTO */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <span className=" text-xs">Entrega</span>
                                <BikeIcon size={14}/>
                            </div>
                            {Number(product.restaurant.deliveryFee) > 0 ? (
                                <p className="text-xs font-semibold"> 
                                    {formatCurrency(Number(product.restaurant.deliveryFee))} 
                                </p>
                            ) : (
                                <p className="text-xs font-semibold">Grátis</p>
                            )}
                        </div>
                        {/* Tempo */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <span className=" text-xs">Tempo</span>
                                <TimerIcon size={14}/>
                            </div>
                            <p className="text-xs font-semibold">
                                {product.restaurant.deliveryTimeMinutes} min
                            </p>
                        </div>
                    </Card>
                </div>
                {/* DESCRIÇÃO */}
                <div className="mt-6 space-y-3 px-5">
                    <h3 className="font-semibold">Sobre</h3>
                    <p className=" font-xm text-muted-foreground">{product.description}</p>
                </div>

                <div className="mt-6 space-y-3">
                    <h3 className="font-semibold px-5">Sucos</h3>
                    <ProductList products={complementaryProducts} />
                </div>
                <div className="px-5 mt-6">
                    <Button className="w-full font-semibold">
                        Adicionar à sacola
                    </Button>
                </div>
            </div>
     );
}
 
export default ProductDetails;