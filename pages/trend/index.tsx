import HomeTabs from '@/components/HomeTabs/HomeTabs';
import classes from './trend.module.scss';
import { Place } from '@/interfaces/place';
import { Category } from '@/interfaces/category';
import PlaceHeader from '@/components/UI/PlaceHeader/PlaceHeader';
import Head from 'next/head';

interface CategorizedPlaces {
    [categoryName: string]: Place[]; // Define the structure for categorized places
}

interface Props {
    tabs: Category[] | [],
    categorizedPlaces: CategorizedPlaces
}

const Trend = (props: Props) => {
    const { tabs, categorizedPlaces } = props;

    return (
        <>
            <Head>
                <title>{`Tripty - Trend Now`}</title>
            </Head>
            <div className={classes.container}>
                <PlaceHeader name='headings.trend' />
                <HomeTabs tabs={tabs} categorizedPlaces={categorizedPlaces} />
            </div>
        </>
    )
}


export async function getStaticProps({ locale }: any) {
    try {
        const categoriesReq = await fetch(`http://18.133.139.168/api/v1/front/categories?change_language=${locale}`);
        const categoriesData = await categoriesReq.json();
        categoriesData.data.unshift({ name: 'all', id: 0, icon: '' });

        const categorizedPlaces: CategorizedPlaces = {}; // Initialize as the defined interface

        await Promise.all(categoriesData.data.map(async (category: any) => {
            const categoryPlacesReq = await fetch(`http://18.133.139.168/api/v1/front/places?change_language=${locale}&trend_now=1&category_id=${category.id}`);
            const categoryPlacesData = await categoryPlacesReq.json();

            categorizedPlaces[category.name] = categoryPlacesData.data;
        }));
        return {
            props: {
                tabs: categoriesData.data,
                categorizedPlaces
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                tabs: [],
                categorizedPlaces: {} as CategorizedPlaces, // Initialize as the defined interface
            }
        };
    }
}

export default Trend;