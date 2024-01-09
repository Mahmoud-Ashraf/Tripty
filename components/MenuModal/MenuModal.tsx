import useHTTP from '@/hooks/use-http';
import classes from './menu-modal.module.scss';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <i onClick={onClick} className="fa-solid fa-play custom-next"></i>
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <i onClick={onClick} className="fa-solid fa-play custom-prev"></i>
    );
}

const MenuModal = ({ menuId }: { menuId: any }) => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [menu, setMenu] = useState();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const getMenu = () => {
        sendRequest(
            {
                url: `/api/menu/${menuId}`,
                method: 'GET'
            },
            (data: any) => {
                setMenu(data);
            },
            (err: any) => console.error(err)
        )
    }

    useEffect(() => {
        getMenu();
    }, [])

    return (
        <div className={classes.container}>
            <Slider {...settings}>
                {
                    // images?.map((img, i) => {
                    //     return (
                    //         <img key={i} src={img} />
                    //     )
                    // })
                }
            </Slider>
        </div>
    )
}

export default MenuModal;