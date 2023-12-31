import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import {
    FacebookShareButton,
    // FacebookIcon,
    LinkedinShareButton,
    // LinkedinIcon,
    TwitterShareButton,
    // TwitterIcon,
    WhatsappShareButton,
    // WhatsappIcon,
    // RedditShareButton,
    // RedditIcon
} from 'react-share'
const ShareButtons = ({ url, title, tags }: any) => {
    const router = useRouter();
    const twitterHandle = "_MsLinda";
    const baseUrl = `${process.env.NEXT_PUBLIC_ORIGIN}${router.locale}`;
    console.log(baseUrl)
    return (
        <Dropdown.Menu>
            <Dropdown.Item>
                <FacebookShareButton url={baseUrl + url} >
                    Facebook
                </FacebookShareButton>
            </Dropdown.Item>
            <Dropdown.Item>
                <LinkedinShareButton url={baseUrl + url} >
                    LinkedIn
                </LinkedinShareButton>
            </Dropdown.Item>
            <Dropdown.Item>
                <WhatsappShareButton url={baseUrl + url} title={title}>
                    WhatsApp
                </WhatsappShareButton>
            </Dropdown.Item>
            <Dropdown.Item>
                <TwitterShareButton url={baseUrl + url} title={title} hashtags={tags}>
                    Twitter
                </TwitterShareButton>
            </Dropdown.Item>
        </Dropdown.Menu>

        // <RedditShareButton url={url} title={title} >
        //     <RedditIcon size={40} round={true} />
        // </RedditShareButton>
    )
}

export default ShareButtons;