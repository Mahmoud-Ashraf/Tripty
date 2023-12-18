import { RootState } from '@/store/index'; // Adjust the path based on your project structure
import { useSelector } from 'react-redux';
import DetailsStep from './DetailsStep';
import BudgetStep from './BudgetStep';
import TagsStep from './TagsStep';
import LocationStep from './LocationStep';
import FinishStep from './FinishStep';
import CreateTrip from '@/components/TripSteps/CreateTrip';
import { useEffect } from 'react';

const TripSteps = () => {
    const step = useSelector((state: RootState) => state.trip.currentStep);

    useEffect(() => {
        console.log('current step :', step);
    }, [step])
    switch (step) {
        case 1:
            return <LocationStep />;
        case 2:
            return <DetailsStep />;
        case 3:
            return <BudgetStep />;
        case 4:
            return <TagsStep />;
        case 5:
            return <CreateTrip />
        default:
            return;
    }
}

export default TripSteps;