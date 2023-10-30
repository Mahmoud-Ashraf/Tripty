import TourismCard from "../TourismCard/TourismCard";
import tourism1 from '@/public/assets/images/tourism1.webp';
import tourism2 from '@/public/assets/images/tourism2.webp';
import tourism3 from '@/public/assets/images/tourism3.webp';
import classes from '../TourismCard/tourism-card.module.scss';
import SectionHeader from "../UI/SectionHeader/SectionHeader";
const HomeTourism = () => {
    return (
        <>
            <SectionHeader title="Tourism Packages" />
            <div className="row">
                <div className="col-6">
                    <TourismCard img={tourism1.src} big />
                </div>
                <div className="col-6">
                    <div className={classes.stacked_images}>
                        <TourismCard img={tourism2.src} />
                        <TourismCard img={tourism3.src} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeTourism;