import EntryPoint from "../EntryPoint/EntryPoint";
import discounts from '@/public/assets/images/discounts.svg';
import tourism from '@/public/assets/images/tourism.svg';
import trend from '@/public/assets/images/trend.svg';
const HomeEntryPoints = () => {
    return (
        <div className="row justify-content-center my-5">
            <div className="col-10">
                <div className="row g-5 justify-content-center">
                    <div className="col-3"><EntryPoint icon={trend} text={'trend'} url="/trend" /></div>
                    <div className="col-3"><EntryPoint icon={discounts} text={'discount'} url="/discounts" /></div>
                    <div className="col-3"><EntryPoint icon={tourism} text={'tourism'} url="/tourism" /></div>
                </div>
            </div>
        </div>
    )
}

export default HomeEntryPoints;