import { useEffect, useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import { Tag } from '@/interfaces/tag';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';

const TagsStep = () => {
    const dispatch = useDispatch();
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [otherTag, setOtherTag] = useState<string>('');
    const [otherTags, setOtherTags] = useState<Tag[]>([])
    useEffect(() => {
        getTags();
    }, []);

    const handleSelectTag = (tag: Tag) => {
        const index = selectedTags.findIndex(selectedTag => selectedTag.id === tag.id);
        if (index !== -1) {
            setSelectedTags([
                ...selectedTags.slice(0, index),
                ...selectedTags.slice(index + 1)
            ])
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }
    const getTags = () => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(data => {
                setTags(data);
                setSelectedTags([]);
            })
            .catch(error => console.log(error));
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
                setOtherTags([...otherTags, data]);
                setOtherTag('');
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        dispatch(tripActions.setTripData({ tags: selectedTags.map(tag => tag.id) }));
    }, [selectedTags])
    return (
        <div className={classes.tags}>
            <TripModalHeading text='How do you want spend your time?' />
            <div className="row mb-5">
                {
                    tags?.map(tag => {
                        return (
                            <div key={tag.id} className="col-auto">
                                <div onClick={() => handleSelectTag(tag)} className={`${classes.selection} ${selectedTags.some(selectedTag => selectedTag.id === tag.id) ? classes.selected : ''}`}>
                                    <span>{tag.name}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <TripModalHeading text='Other' />
            <div className="row">
                <div className="col-md-7">
                    <div className={classes.inputContainer}>
                        <input className={classes.input} onChange={(e: any) => setOtherTag(e.target.value)} value={otherTag} placeholder='Spa, Shopping' />
                        <button onClick={addTag} className={classes.addTagBtn}>+</button>
                    </div>
                    <div className="row mt-4">
                        {
                            otherTags?.map(newTag => {
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
    )
}

export default TagsStep;