import { Grid } from '@mui/material';
import Container from '../Container/Container';
import { ContentWrapper, Delivery, Telephone, Wrapper } from './styles';

const Header = () => {
    return (
        <Wrapper>
            <Container>
                <ContentWrapper>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sm={4} md={5} lg={7}>
                            <div>cgbcrj</div>
                        </Grid>
                        <Grid item xs={5} sm={4} md={4} lg={3}>
                            <Delivery>Доставка с 9:00 до 19:00</Delivery>
                        </Grid>
                        <Grid item xs={4} sm={4} md={3} lg={2}>
                            <Telephone href="tel:+79269376840">+7 (926) 937-68-40</Telephone>
                        </Grid>
                    </Grid>
                </ContentWrapper>
            </Container>
        </Wrapper>
    );
};

export default Header;
