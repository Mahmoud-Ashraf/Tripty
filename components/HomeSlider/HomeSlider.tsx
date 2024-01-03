import classes from './home-slider.module.scss';
import { Slider } from '@/interfaces/slider';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import seperator from '@/public/assets/images/seperator.svg';
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
            <Carousel className={classes.carousel} activeIndex={index} onSelect={handleSelect}>
                {
                    sliders?.map(slider => {
                        return (
                            <Carousel.Item key={slider?.id} className={classes.item}>
                                <img className={classes.img} src={slider?.image} alt="slider" />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            <div className={classes.seperatorContainer}>
                <Image className={classes.seperator} src={seperator} alt={'seperator'} />
            </div>
        </div>
    )
}

export default HomeSlider;