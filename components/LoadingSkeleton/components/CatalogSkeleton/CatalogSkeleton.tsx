import { Grid, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { MainCategory, SubCategory, SubCategoryWrapper, Wrapper } from './styles';

const CatalogSkeleton = () => {
    return (
        <div>
            <Skeleton height={50} />
            <Wrapper>
                <div>
                    {Array(2)
                        .fill(null)
                        .map(() => {
                            return (
                                <>
                                    <MainCategory>
                                        <Skeleton height={20} />
                                    </MainCategory>
                                    <SubCategoryWrapper>
                                        {Array(3)
                                            .fill(null)
                                            .map(() => {
                                                return (
                                                    <SubCategory>
                                                        <Skeleton height={10} />
                                                    </SubCategory>
                                                );
                                            })}
                                    </SubCategoryWrapper>
                                </>
                            );
                        })}
                </div>
                <div>
                    <Grid container spacing={2}>
                        {Array(12)
                            .fill(null)
                            .map(() => {
                                return (
                                    <Grid item xs={3}>
                                        <Skeleton height={300} />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </div>
            </Wrapper>
        </div>
    );
};

export default CatalogSkeleton;
