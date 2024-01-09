import ReactPlayer from 'react-player';
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

const GalleryModal = ({ images }: { images: any[] }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // rtl: true,
        adabtiveHeight: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className={classes.container}>
            <Slider {...settings}>
                {
                    images?.map((img, i) => {
                        return (
                            img.video_url ?
                                <ReactPlayer controls width='100%' height='500px' key={i} url={img.video_url} />
                                :
                                <img key={i} src={img} />
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default GalleryModal;