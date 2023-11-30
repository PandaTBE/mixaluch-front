import { FC } from 'react';
import { IProps } from './interfaces';
import { DataWrapper, Title } from './styles';
import { IEvotorProduct } from '../../../../../../models/Evotor';

const EvotorProductData: FC<IProps> = ({ evotorProduct }) => {
    const data: { key: keyof IEvotorProduct; text: string; additionalText?: string }[] = [
        { key: 'name', text: 'Название' },
        { key: 'price', text: 'Цена', additionalText: '₽' },
        { key: 'measureName', text: 'Ед. измерения' },
        { key: 'code', text: 'Код' },
    ];

    return (
        <div>
            <Title>Данные товара Эвотор</Title>
            {data.map((item) => (
                <DataWrapper key={item.key}>
                    <span>{item.text}:&nbsp;</span>
                    <div>{evotorProduct[item.key]}&nbsp;</div>
                    {item.additionalText && <div>{item.additionalText}</div>}
                </DataWrapper>
            ))}
        </div>
    );
};

export default EvotorProductData;
