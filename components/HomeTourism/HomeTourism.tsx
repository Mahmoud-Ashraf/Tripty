import TourismCard from "../TourismCard/TourismCard";
import tourism1 from '@/public/assets/images/tourism1.webp';
import tourism2 from '@/public/assets/images/tourism2.webp';
import tourism3 from '@/public/assets/images/tourism3.webp';
import classes from '../TourismCard/tourism-card.module.scss';
import SectionHeader from "../UI/SectionHeader/SectionHeader";
const HomeTourism = () => {
    return (
        <>
            <SectionHeader title="entries.tourism" />
            <div className="row mb-5">
                <div className="col-md-7">
                    <TourismCard
                        img={tourism1.src}
                        big />
                </div>
                <div className="col-md-5">
                    <div className="row">
                        <div className="col-12">
                            <TourismCard img={tourism2.src} />
                        </div>
                        <div className="col-12">
                            <TourismCard img={tourism3.src} />
                        </div>
                    </div>
                    {/* <div className={classes.stacked_images}>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default HomeTourism;