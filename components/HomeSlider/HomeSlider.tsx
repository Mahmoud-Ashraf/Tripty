import classes from './home-slider.module.scss';
import { Slider } from '@/interfaces/slider';
import { SetStateAction, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface Props {
    sliders: Slider[] | undefined
}
const HomeSlider = (props: Props) => {
    const { sliders } = props;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };
    return (
        <div className={`${classes.container} home-slider`}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {
                    sliders?.map(slider => {
                        return (
                            <Carousel.Item key={slider.id}>
                                <img className='w-100 d-block' src={slider.image} alt="slider" />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default HomeSlider;