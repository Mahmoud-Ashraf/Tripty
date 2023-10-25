import Review from "../Review/Review";
import SectionHeader from "../UI/SectionHeader/SectionHeader";
import Slider from "react-slick";

const HomeReviews = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1.8,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: "0",
    };
    return (
        <>
            <SectionHeader title="Happy Customers" />
            <Slider {...settings}>
                <div>
                    <Review review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies mi eget mauris pharetra. Amet risus nullam eget felis eget nunc lobortis. Purus in massa tempor nec. Porta nibh venenatis cras sed. Viverra ipsum nunc aliquet bibendum enim. Risus pretium quam" user={{ name: 'mahmoud taha', title: 'frontend Developer', avatar: '@/public/assets/images/logo.svg' }} />
                </div>
                <div>
                    <Review review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies mi eget mauris pharetra. Amet risus nullam eget felis eget nunc lobortis. Purus in massa tempor nec. Porta nibh venenatis cras sed. Viverra ipsum nunc aliquet bibendum enim. Risus pretium quam" user={{ name: 'mahmoud taha', title: 'frontend Developer', avatar: '@/public/assets/images/logo.svg' }} />
                </div>
                <div>
                    <Review review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies mi eget mauris pharetra. Amet risus nullam eget felis eget nunc lobortis. Purus in massa tempor nec. Porta nibh venenatis cras sed. Viverra ipsum nunc aliquet bibendum enim. Risus pretium quam" user={{ name: 'mahmoud taha', title: 'frontend Developer', avatar: '@/public/assets/images/logo.svg' }} />
                </div>
                <div>
                    <Review review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies mi eget mauris pharetra. Amet risus nullam eget felis eget nunc lobortis. Purus in massa tempor nec. Porta nibh venenatis cras sed. Viverra ipsum nunc aliquet bibendum enim. Risus pretium quam" user={{ name: 'mahmoud taha', title: 'frontend Developer', avatar: '@/public/assets/images/logo.svg' }} />
                </div>
            </Slider>
        </>
    )
}

export default HomeReviews;