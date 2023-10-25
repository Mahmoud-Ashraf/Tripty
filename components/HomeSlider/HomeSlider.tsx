import useHTTP from '@/hooks/use-http';
import classes from './home-slider.module.scss';
import { Slider } from '@/interfaces/slider';
import { SetStateAction, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

const HomeSlider = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [sliders, setSliders] = useState<Slider[]>();
    const [index, setIndex] = useState(0);
    const getSliders = () => {
        sendRequest(
            {
                url: 'sliders',
                method: 'GET'
            },
            (data: { data: Slider[], error: boolean, message: string }) => {
                setSliders(data.data);
                console.log(data.data);
            }
        )
    }

    useEffect(() => {
        getSliders();
    }, []);


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