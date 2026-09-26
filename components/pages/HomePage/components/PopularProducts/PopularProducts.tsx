import { FC } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ProductCard from '../../../../ProductCard/ProductCard';
import ProductCardSkeleton from '../../../../LoadingSkeleton/components/ProductCardSkeleton';
import { productReducerValues } from '../../../../../slices/Product/product';
import { NavigationLink, SectionHeading } from '../../styles';
import { ProductGrid, Wrapper } from './styles';

interface IProps {
    isSkeleton?: boolean;
}

const PopularProducts: FC<IProps> = ({ isSkeleton = false }) => {
    const { popularProducts } = useSelector(productReducerValues);
    if (popularProducts?.length === 0 || (!popularProducts && !isSkeleton)) return null;

    return (
        <Wrapper aria-labelledby="popular-products-title">
            <SectionHeading>
                <h2 id="popular-products-title">Часто выбирают</h2>
                {isSkeleton ? (
                    <NavigationLink as="span">
                        Весь каталог <ArrowForwardRoundedIcon />
                    </NavigationLink>
                ) : (
                    <Link href="/catalog" passHref>
                        <NavigationLink>
                            Весь каталог <ArrowForwardRoundedIcon />
                        </NavigationLink>
                    </Link>
                )}
            </SectionHeading>
            <ProductGrid>
                {isSkeleton
                    ? Array.from({ length: popularProducts?.length ?? 8 }, (_, index) => (
                          <ProductCardSkeleton imageHeight="220px" product={popularProducts?.[index]} key={index} />
                      ))
                    : popularProducts?.map((product) => (
                          <ProductCard imageHeight="220px" product={product} key={product.id} />
                      ))}
            </ProductGrid>
        </Wrapper>
    );
};

export default PopularProducts;
