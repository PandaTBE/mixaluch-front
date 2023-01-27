import { Grid } from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { MainCategory, SkeletonPageWrapper, SubCategory, SubCategoryWrapper, Wrapper } from './styles';

/**
 * Компонент для отображения зазрузки
 */
const CatalogSkeleton = () => {
    return (
        <SkeletonPageWrapper>
            <Skeleton height={50} width={100} />
            <Wrapper>
                <div>
                    {Array(2)
                        .fill(null)
                        .map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <MainCategory>
                                        <Skeleton height={20} />
                                    </MainCategory>
                                    <SubCategoryWrapper>
                                        {Array(3)
                                            .fill(null)
                                            .map((_, index) => {
                                                return (
                                                    <SubCategory key={index}>
                                                        <Skeleton height={10} />
                                                    </SubCategory>
                                                );
                                            })}
                                    </SubCategoryWrapper>
                                </React.Fragment>
                            );
                        })}
                </div>
                <div>
                    <Grid container spacing={2}>
                        {Array(12)
                            .fill(null)
                            .map((_, index) => {
                                return (
                                    <Grid key={index} item xs={3}>
                                        <Skeleton height={300} />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </div>
            </Wrapper>
        </SkeletonPageWrapper>
    );
};

export default CatalogSkeleton;
