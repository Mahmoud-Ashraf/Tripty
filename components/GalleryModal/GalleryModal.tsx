import classes from './gallery-modal.module.scss';
import Slider from 'react-slick';

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

const GalleryModal = ({ images }: { images: string[] }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className={classes.container}>
            <Slider {...settings}>
                {
                    images?.map((img, i) => {
                        return (
                            <img key={i} src={img} />
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default GalleryModal;