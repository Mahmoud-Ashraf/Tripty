import Translate from '@/components/helpers/Translate/Translate';
import classes from './place-header.module.scss';
import { Offer } from '@/interfaces/offer';
import Image from 'next/image';
import Dropdown from 'react-bootstrap/Dropdown';
import ShareButtons from '../ShareButtons/ShareButtons';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { authActions } from '@/store/Auth/Auth';
import useHTTP from '@/hooks/use-http';

interface placeHeaderProps {
    name?: string | undefined,
    img?: string | undefined,
    id?: number,
    logo?: string,
    share?: boolean,
    fav?: boolean,
    isFav?: boolean,
    discount?: false | null | Offer,
    children?: any,
    onClick?: () => void
}
const PlaceHeader = (props: placeHeaderProps) => {
    const dispatch = useDispatch();
    const { name, img, id, logo, share = false, fav = false, isFav, discount = false, children, onClick } = props;
    const [isFavorite, setIsFavorite] = useState(isFav);
    const { data: session }: any = useSession();
    const { isLoading, error, sendRequest } = useHTTP();

    const handleToggleFav = () => {
        if (session?.token) {
            const prevFav = isFavorite;
            setIsFavorite(prev => !prev);
            sendRequest(
                {
                    url: `/api/favs/toggle?prevFav=${prevFav}&placeId=${id}`
                },
                (data: any) => setIsFavorite(data.is_favoritable),
                (err: any) => console.error(err)
            )
        } else {
            dispatch(authActions.openShowAuthModal());
        }
    }
    return (
        <div className={classes.container} style={{ backgroundImage: `url('${img}')`, cursor: `${onClick ? 'pointer' : 'auto'}` }} onClick={onClick}>
            <div className={classes.inner}>
                <div className={`${classes.name} ${!discount && !fav && !logo && 'flex-column justify-content-center'}`}>
                    {name && <h2><Translate id={name} /></h2>}
                    {children && children}
                    {share && <div className={classes.actions}>
                        {/* <button>
                        </button> */}
                        <Dropdown>
                            <Dropdown.Toggle className='text-white' variant="transperent" id="share-dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20.098" height="23.797" viewBox="0 0 20.098 23.797">
                                    <path d="M0 0v8.879A2.267 2.267 0 0 0 2.312 11.1h13.874A2.267 2.267 0 0 0 18.5 8.879V0" transform="translate(.8 11.899)" fill='none' stroke='#6c3d8e' strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='10' strokeWidth='1.6px' />
                                    <path data-name="Path" d="M9.249 4.439 4.624 0 0 4.439" transform="translate(5.424 .8)" fill='none' stroke='#6c3d8e' strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='10' strokeWidth='1.6px' />
                                    <path data-name="Path" d="M.469 0v14.428" transform="translate(9.58 .8)" fill='none' stroke='#6c3d8e' strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='10' strokeWidth='1.6px' />
                                </svg>
                                {/* <img src={share} alt="share icon" /> */}
                            </Dropdown.Toggle>
                            <ShareButtons url={`/place/${id}`} title={name} />
                        </Dropdown>
                        {logo &&
                            <div className={classes.logoContainer}>
                                <img src={logo} alt={`${name} logo`} />
                            </div>
                        }
                    </div>}
                </div>
                <div className={classes.offer}>
                    {discount && <div className={classes.offerData}><span>{discount.amount}{discount.type === "percentage" && '%'}</span> <Translate id='place.getDiscount' /></div>}
                    {fav && <button onClick={handleToggleFav} className={classes.fav}><svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39">
                        <rect width="39" height="39" rx="4" fill="#f8f8f8" />
                        <path data-name="Icon" d="m10.5 19-.351-.318C2.153 11.955 0 9.591 0 5.727A5.639 5.639 0 0 1 5.536 0 6.29 6.29 0 0 1 10.5 2.636 6.29 6.29 0 0 1 15.464 0 5.639 5.639 0 0 1 21 5.727c0 3.864-2.153 6.227-10.149 12.955L10.5 19z" transform="translate(9 10)" fill={isFavorite ? '#dc3545' : '#cbcfe9'} />
                    </svg></button>}
                </div>
            </div>
        </div >
    )
}

export default PlaceHeader;