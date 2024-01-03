import EntryPoint from "../EntryPoint/EntryPoint";
import discounts from '@/public/assets/images/discounts.svg';
import tourism from '@/public/assets/images/tourism.svg';
import trend from '@/public/assets/images/trend.svg';
const HomeEntryPoints = () => {
    return (
        <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
                <div className="row g-3 justify-content-center">
                    <div className="col-md-4"><EntryPoint icon={trend} text={'trend'} url="/trend" /></div>
                    <div className="col-md-4"><EntryPoint icon={discounts} text={'discount'} url="/discounts" /></div>
                    <div className="col-md-4"><EntryPoint icon={tourism} text={'tourism'} url="/tourism-packages" /></div>
                </div>
            </div>
        </div>
    )
}

export default HomeEntryPoints;