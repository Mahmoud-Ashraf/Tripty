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
    const twitterHandle = "_MsLinda";
    const baseUrl = window.location.origin;
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