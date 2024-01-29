import { useEffect, useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import { Tag } from '@/interfaces/tag';
import { useDispatch, useSelector } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import useTranslate from '@/hooks/use-translate';
import useHTTP from '@/hooks/use-http';
import Loader from '../UI/Loader/Loader';
import { RootState } from '@/store';

const TagsStep = () => {
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const tripData = useSelector((state: RootState) => state.trip.tripData);
    const [tags, setTags] = useState<Tag[]>([]);
    const [otherTag, setOtherTag] = useState<string>('');
    const { isLoading, error, sendRequest } = useHTTP();
    useEffect(() => {
        getTags();
    }, []);

    const handleSelectTag = (tag: Tag) => {
        const index = tripData?.tags?.findIndex((selectedTag: any) => selectedTag.id === tag.id);
        if (index !== -1) {
            dispatch(tripActions.setTripData({ tags: [...tripData?.tags?.slice(0, index), ...tripData.tags.slice(index, 1)] }));
            // setSelectedTags([
            //     ...selectedTags.slice(0, index),
            //     ...selectedTags.slice(index + 1)
            // ])
        } else {
            dispatch(tripActions.setTripData({ tags: [...tripData?.tags, tag] }));
            // setSelectedTags([...selectedTags, tag]);
        }
    }
    const getTags = () => {
        sendRequest(
            {
                url: '/api/tags',
                method: 'GET'
            },
            (data: any) => {
                setTags(data);
            },
            (error: any) => console.log(error)
        )
    }

    const addTag = () => {
        if (otherTag && otherTag.length > 2) {
            postNewTag()
        }
    }

    const postNewTag = () => {
        fetch('/api/tags/add', {
            method: 'POST',
            body: JSON.stringify({ name: otherTag })
        })
            .then(res => res.json())
            .then(data => {
                dispatch(tripActions.setTripData({ otherTags: [...tripData?.otherTags, data] }));
                setOtherTag('');
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            {isLoading && <Loader full />}
            <div className={classes.tags}>
                <TripModalHeading text='howSpendTime' />
                <div className="row mb-5 gy-2">
                    {
                        tags?.map(tag => {
                            return (
                                <div key={tag.id} className="col-auto">
                                    <div onClick={() => handleSelectTag(tag)} className={`${classes.selection} ${tripData?.tags.some(selectedTag => selectedTag.id === tag.id) ? classes.selected : ''}`}>
                                        <span>{tag.name}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <TripModalHeading text='other' />
                <div className="row">
                    <div className="col-md-7">
                        <div className={classes.inputContainer}>
                            <input className={classes.input} onChange={(e: any) => setOtherTag(e.target.value)} value={otherTag} placeholder={translate('tripModal.tagsPlaceHolder')} />
                            <button onClick={addTag} className={classes.addTagBtn}>+</button>
                        </div>
                        <div className="row mt-4">
                            {
                                tripData?.otherTags?.map((newTag: Tag) => {
                                    return (
                                        <div key={newTag.id} className="col-auto">
                                            <div className={`${classes.selection}`}>
                                                <span>{newTag.name}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TagsStep;