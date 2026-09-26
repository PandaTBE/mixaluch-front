import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Feedback from './components/Feedback/Feedback';
import MainCategories from './components/MainCategories/MainCategories';
import PopularProducts from './components/PopularProducts/PopularProducts';
import { Intro, PageHeading, Editorial, EditorialCopy, EditorialImage, StoreNote, NavigationLink } from './styles';

const HomePage = () => (
    <div>
        <Intro>
            <PageHeading>Мясо, рыба и другие продукты</PageHeading>
            <Link href="/catalog" passHref>
                <NavigationLink>
                    Весь каталог <ArrowForwardRoundedIcon />
                </NavigationLink>
            </Link>
        </Intro>
        <MainCategories />
        <PopularProducts />
        <Editorial>
            <EditorialCopy>
                <span>Для встреч за одним столом</span>
                <h2>
                    Вы выбираете мясо.
                    <br />
                    Маринад — за нами.
                </h2>
                <p>Подготовим шашлык к вашему выезду: любимое мясо, подходящий маринад и ничего лишнего.</p>
                <Link href="/kebab">
                    <a>
                        Выбрать шашлык <ArrowForwardRoundedIcon />
                    </a>
                </Link>
            </EditorialCopy>
            <EditorialImage>
                <Image
                    src="/static/kebab/kebab.jpeg"
                    alt="Мясо для шашлыка в маринаде с луком"
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 650px) 100vw, 50vw"
                />
            </EditorialImage>
        </Editorial>
        <StoreNote>
            <p>
                <strong>Доставляем по Подольску.</strong> Ждём в магазине на Правды, 28.
            </p>
            <Link href="/delivery" passHref>
                <NavigationLink>
                    О доставке <ArrowForwardRoundedIcon />
                </NavigationLink>
            </Link>
            <Link href="/contacts" passHref>
                <NavigationLink>
                    Как нас найти <ArrowForwardRoundedIcon />
                </NavigationLink>
            </Link>
        </StoreNote>
        <Feedback />
    </div>
);

export default HomePage;
