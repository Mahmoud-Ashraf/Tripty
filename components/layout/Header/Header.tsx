import Link from 'next/link';
import classes from './header.module.scss';
import logo from '@/public/assets/images/logo.svg';
import userIcon from '@/public/assets/images/user_icon.svg';
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';

const Header = () => {
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch(tripActions.openShowTripModal());
    }
    return <header className={classes.container}>
        <Link href={'/home'} className={classes.logo}>
            <Image loading='lazy' alt='Tripty Logo' src={logo} />
        </Link>
        <div className={classes.nav}>
            <Link href={'/home'}>Home</Link>
            <Link href={'/about'}>About</Link>
            <Link href={'/places'}>places</Link>
        </div>
        <div className={classes.user}>
            <button className={classes.user_startTrip} onClick={openModal}>Start you trip
                <svg xmlns="http://www.w3.org/2000/svg" width="131.593" height="35.502" viewBox="0 0 131.593 35.502">
                    <defs>
                        <clipPath id="bxt70uwyba">
                            <path data-name="Rectangle 136" fill="#fff" d="M0 0h131.593v35.502H0z" />
                        </clipPath>
                    </defs>
                    <g data-name="Group 39715">
                        <g data-name="Group 152" clipPath="url(#bxt70uwyba)">
                            <path data-name="Path 155" d="M14.9 30.078c-.312 1.4-.665 1.723-2.032 1.622a17.87 17.87 0 0 1-3.039-.491 1.706 1.706 0 0 1-1.439-2.12c.061-.782.1-1.567.133-2.351.024-.624.347-.873.945-.846s.714.332.68.88a2.823 2.823 0 0 0 2.051 2.4c.673.092 1.34.225 2.211.374-.236-.2-.314-.318-.414-.343-.332-.085-.671-.139-1.008-.2-1.7-.31-2.279-.963-2.45-2.736-.015-.158-.086-.411-.189-.445-.66-.219-.521-.743-.5-1.212.094-1.838.2-3.675.3-5.512a1.355 1.355 0 0 0-.064-.639 1.076 1.076 0 0 1 .239-1.393 1.429 1.429 0 0 0 .246-.659c.362-1.473.708-2.951 1.073-4.424a2.886 2.886 0 0 1 1.871-2.017 16.736 16.736 0 0 1 5.751-1.089c2.476-.106 4.956-.131 7.434-.2.292-.008.766.144.613-.543-.922 0-1.85-.012-2.778 0-1.742.027-3.485.073-5.227.1a7.6 7.6 0 0 1-1.1-.04 1.508 1.508 0 0 1-1.428-.985 2.308 2.308 0 0 1 .6-2.167c.019.332.042.485.033.636-.059 1.05.412 1.581 1.45 1.567 2.724-.036 5.459.035 8.166-.206a21.454 21.454 0 0 1 2.6-.009c4.979.142 9.965.135 14.946.054.8-.013 1.595-.608 2.364.111h8.336a6.1 6.1 0 0 0-3.431-1.605Q35.722 5.237 19.6 4.858a1.68 1.68 0 0 1-.825-.179c9.679-.511 19.358-.664 29.062-.52-.85-.2-1.7-.4-2.551-.592a99.1 99.1 0 0 0-17.043-2.25 22.617 22.617 0 0 0-6.3.266 5.966 5.966 0 0 0-3.766 2.494 3.525 3.525 0 0 0-.243.518l-.289-.262A4.523 4.523 0 0 1 19.9 1.487a10.05 10.05 0 0 1 3.052-.994 61.634 61.634 0 0 1 6.6-.448q7.547-.091 15.1 0a17.606 17.606 0 0 1 8.237 1.9c1.008.541 1.907 1.283 2.874 1.906.433.279.925.467 1.362.74a1.384 1.384 0 0 1 .514.557c.171.377.214.813.389 1.187.583 1.249.068 2.117-1.311 2.085-3.092-.072-6.183-.178-9.274-.258-.31-.008-.806-.186-.649.674 1.77 0 3.559-.074 5.339.018 2.4.124 4.793.328 7.178.6a13.913 13.913 0 0 1 2.529.745 1.253 1.253 0 0 1 .519.267c.276.286.508.614.757.925l-.884.678c.731 1.17 1.5 2.432 2.3 3.673a5.639 5.639 0 0 0 1.793 2.172 2.033 2.033 0 0 1 .638 1.115c.241.744.373 1.523.6 2.275a16.286 16.286 0 0 0 .628 1.7 3.011 3.011 0 0 1-.122 2.886 1.444 1.444 0 0 0 .247 1.87 2.086 2.086 0 0 1 .815 2.014 1.82 1.82 0 0 1-1.737 1.358c-1.382.2-2.768.39-4.158.5-1.034.085-1.322-.2-1.68-1.158-.432-1.152-.593-2.437-1.694-3.267a4.062 4.062 0 0 0-2.409-.964q-.883-.016-1.767-.026a4.264 4.264 0 0 0-4.169 2.711c-.163.349-.316.528-.745.527q-10.641-.025-21.282-.018a1.022 1.022 0 0 1-.615-.18c6.816-.5 13.645-.569 20.564-.821v-9.43H48.8l-33.286-.065c-.294 0-.589-.022-.883-.016-1.863.041-1.533-.4-1.949 1.564a19.55 19.55 0 0 0-.343 4.373 3.924 3.924 0 0 0 2.891 3.275.68.68 0 0 0 .529-.243 2.157 2.157 0 0 1 1.877-.781q3.57.053 7.142.012a1.633 1.633 0 0 1 1.728 1.04c.857 1.948 2.431 2.649 4.5 2.637 6.48-.037 12.961-.01 19.441-.008h.653c.25-.647.435-1.282.73-1.861a4.607 4.607 0 0 1 4.861-2.45 4.426 4.426 0 0 1 2.187 8.222 1.674 1.674 0 0 0-.571.484h73.284v.194H24.617l-.031-.121a6.7 6.7 0 0 1 .687-.09l13.026-.4q5.152-.154 10.3-.3a2.075 2.075 0 0 0 2.159-2.2v-.468h1.8a3.271 3.271 0 0 1 .879-2.989 5.039 5.039 0 0 1 2.107-1.081 3.355 3.355 0 0 1 3.912 2.123 3.211 3.211 0 0 1-1.316 3.8 3.615 3.615 0 0 1-4.24-.217c.806-.19 1.587-.436 2.386-.547a2.025 2.025 0 0 0 1.947-2.142 2.118 2.118 0 0 0-4.21.44c.023.214.082.425.134.685l-1.026.3.3.77-1.154.157c.668 1.554 2.979 2.436 5.027 1.947a4.241 4.241 0 0 0 3.36-4.548 4.149 4.149 0 0 0-4-3.721c-2.692-.28-4.329 1.053-5.24 4.319H31.725q-.663 0-1.325-.015a4.016 4.016 0 0 1-3.889-2.3 2.2 2.2 0 0 0-2.362-1.385c-2.109.059-4.221.038-6.332.014a2.162 2.162 0 0 0-1.929.842.565.565 0 0 1-.873.167c-.435-.274-.9-.5-1.332-.778a3.766 3.766 0 0 1-1.76-3.145 15.854 15.854 0 0 1 .774-5.434c.152-.509.495-.451.857-.449 4.565.024 9.131.059 13.7.069q11.083.025 22.166.018c.342 0 .853.16.728-.622-2.256 0-4.511.007-6.765 0q-15.243-.058-30.486-.142c-.69 0-1.056.187-1.2.844-.169.763-.357 1.523-.533 2.285-.058.25-.105.5-.158.754h-.191a3.117 3.117 0 0 1-.067-.5 31.35 31.35 0 0 1 1.578-8.8 2.8 2.8 0 0 1 2.224-2.031 34.294 34.294 0 0 1 5.87-.842c11.142-.081 22.285-.067 33.427-.024a22.338 22.338 0 0 1 7.259 1.006c.231.08.456.177.679.278.055.025.089.1.189.208l-31.958-.24v.274l20.026.233v5.534l.686.053v-5.56c1.025 0 1.925-.01 2.825 0 2.111.029 4.221.09 6.332.09a1.178 1.178 0 0 1 1.16.685c.756 1.318 1.575 2.6 2.343 3.911a4.936 4.936 0 0 1 .324.934 3.472 3.472 0 0 1-1 .318c-3.559 0-7.118-.034-10.677-.057a3.092 3.092 0 0 0-.733.016 1.665 1.665 0 0 0-.478.321l.085.278H65.44l.01.34c-5.135.479-10.3.556-15.608.8v9.7l-11.826.338v.07c4.216 0 8.433 0 12.649-.016a.749.749 0 0 0 .532-.364 4.661 4.661 0 0 1 4.8-2.84 10.882 10.882 0 0 1 3.017.414 3.791 3.791 0 0 1 2.479 3c.612-.118 1.157-.262 1.71-.321 1.282-.137 2.569-.234 3.884-.349l-.093-.707c.932.086 1.421.486 1.479 1.173a1.331 1.331 0 0 1-1.231 1.483c-1.591.257-3.2.416-4.782.614a1.728 1.728 0 0 0 .569.118c1.459-.163 2.918-.331 4.371-.543a1.456 1.456 0 0 0 1.384-1.129 1.661 1.661 0 0 0-.74-1.724 1.105 1.105 0 0 1-.527-1.035c.011-.182-.22-.446-.409-.56a1.9 1.9 0 0 1-.808-1.93 1.734 1.734 0 0 1 1.013-1.84 3.036 3.036 0 0 0 .315 3.3 2.144 2.144 0 0 0 .325-2.509 13.725 13.725 0 0 1-1.085-3.48c-.256-.876-.358-1.8-1.4-2.158-.116-.04-.195-.213-.273-.336q-1.712-2.7-3.417-5.411a2.658 2.658 0 0 1-.134-.3l1.1-.237.077-.218a3.286 3.286 0 0 0-.887-.631 25.221 25.221 0 0 0-4.608-1.14c-3.347-.279-6.714-.316-10.072-.449-.263-.01-.527 0-.829 0l-.078-.847h-1.068l-.124.754H29.044l-.106-.765h-1.2c.146.8-.365.8-.983.817-2.992.075-5.989.118-8.973.329a20.528 20.528 0 0 0-3.93.866 2.611 2.611 0 0 0-1.962 2.08c-.328 1.506-.685 3.006-1.03 4.508-.005.024.006.057-.007.072-1.038 1.188-.206 2.609-.464 3.912a27.553 27.553 0 0 0-.225 4.184c0 .119-.012.324.042.347.783.331.59 1.02.663 1.639a2.484 2.484 0 0 0 1.768 1.685c.508.082 1.014.177 1.515.293.155.036.39.134.417.247.225.911 1.044.709 1.588.952a18.249 18.249 0 0 1 1.029-1.9 1.281 1.281 0 0 1 .9-.483c2.034-.039 4.071-.04 6.1.012a1.637 1.637 0 0 1 1.048.519 3.9 3.9 0 0 1 .614 4.52 4.4 4.4 0 0 1-4.126 2.709c-1.349.04-2.7.015-4.05.015H.808c-.27 0-.541-.03-.811-.046q0-.129.005-.257h1.183q9.979 0 19.957.013a4.581 4.581 0 0 0 3.94-1.746 3.869 3.869 0 0 0-.01-4.888 1.982 1.982 0 0 0-1.1-.55 7.525 7.525 0 0 0-1.982-.025c.172.066.346.129.517.2a2.957 2.957 0 1 1-2.517 5.329 1.229 1.229 0 0 1-.478-.917c0-.387.235-.675.747-.347a2.393 2.393 0 0 0 1.1.328 1.57 1.57 0 0 0 1.788-1.452 1.8 1.8 0 0 0-1.5-1.958 1.978 1.978 0 0 0-2.133 1.078c-.157.269-.544.4-.98.707l.318 4.1a7.5 7.5 0 0 1-1.488-1.32 6.7 6.7 0 0 1-1.013-2.384c-.118-.734-.322-1.1-1.046-1.166a2.35 2.35 0 0 1-.4-.112M60.41 10.759a1.8 1.8 0 0 0-.395-.142 59.4 59.4 0 0 0-6.349-.682q-16.6-.1-33.2.014a34.232 34.232 0 0 0-5.8.833 2.6 2.6 0 0 0-2.1 2.042 173.8 173.8 0 0 0-.994 3.915c-.14.588-.215 1.191-.356 2 .452-.514.439-1.1 1.175-1.1 10.087.067 20.174.092 30.26.131 2.405.009 4.81.036 7.215.051.319 0 .711.078.658-.482l-.83-.128v-5.484l-32.968-.54c.189-.229.217-.294.246-.294q21.713-.5 43.435-.133M56.211 7.5l-.078.208-9.37-.223-.018.255a2.559 2.559 0 0 0 .453.1c3.139.1 6.277.212 9.417.262a1.49 1.49 0 0 0 1.16-.515c.171-.315-.023-.868-.148-1.29-.107-.361-.612-.591-.342-1.094.022-.041-.217-.322-.314-.311-.673.076-.98-.457-1.428-.774a28.038 28.038 0 0 0-2.866-1.913C49.717.612 46.463.341 43.183.319 38.522.289 33.859.266 29.2.328a59.88 59.88 0 0 0-6.081.445 20.948 20.948 0 0 0-2.957.77l.064.22a10.655 10.655 0 0 1 2.1-.547c2.1-.118 4.206-.234 6.3-.156a78.955 78.955 0 0 1 13.645 1.591 71.049 71.049 0 0 0 12.714 1.815 1.086 1.086 0 0 1 .343.141c-9.372-.2-18.718-.314-28.064.048a1.713 1.713 0 0 0 .436.045l24.132.6c1.842.043 3.043 1.24 4.376 2.213m7.234 9.47c-.158-.319-.239-.515-.347-.7-.778-1.3-1.578-2.6-2.333-3.913a1.01 1.01 0 0 0-1-.559c-2.624-.019-5.247-.068-7.871-.1-.259 0-.518.025-.831.042v5.23zm-50.8 14.477c.528-.051.932.028 1.138-.139a2.226 2.226 0 0 0 .649-1.024c.032-.1-.4-.446-.67-.529a9.111 9.111 0 0 0-1.583-.3A3.2 3.2 0 0 1 9.81 26.9c-.018-.24-.235-.618-.424-.663-.472-.111-.526.3-.544.658-.037.734-.047 1.47-.121 2.2-.1.973.165 1.531 1.1 1.79.985.273 2.008.413 2.821.573m42.05 2.161a3.371 3.371 0 0 0 4.187-1.152 2.839 2.839 0 0 0-.521-3.673 3.383 3.383 0 0 0-4.273-.149 2.623 2.623 0 0 0-.989 3.175l.6-.156c-.029-2.333 1.257-3.493 3.23-2.954a2.252 2.252 0 0 1 1.641 2.258 2.32 2.32 0 0 1-1.849 2.183c-.618.122-1.228.282-2.024.468m-1.8-.91c-.222-.59-.723-.713-1.785-.487a2.437 2.437 0 0 1-2.746 2.578l-10.041.313v.042h15.734a4.76 4.76 0 0 1-2.439-2.444zm14.885-4.259a5.509 5.509 0 0 1-1.28.558c-1.213.153-2.436.227-3.655.325-.463.037-.955.11-.966.677a.791.791 0 0 0 .959.784c1.485-.12 2.972-.266 4.441-.5a1.264 1.264 0 0 0 .824-.8c.076-.332-.221-.75-.323-1.039M44.842 8.668c.145-.661-.3-.544-.616-.545q-7.142-.012-14.283-.014a1.5 1.5 0 0 0-.438.023.326.326 0 0 0-.2.233.33.33 0 0 0 .191.244 1.535 1.535 0 0 0 .437.014c2.626.015 5.251.035 7.877.044 2.328.007 4.656 0 7.029 0M19.711 32.555c.168.29.241.59.427.707a2.671 2.671 0 0 0 3.855-1.679 2.749 2.749 0 0 0-2.079-3.243 2.665 2.665 0 0 0-3.257 2.028 1.076 1.076 0 0 0 .6-.357 2.314 2.314 0 0 1 2.577-1.111 2.154 2.154 0 0 1 1.666 2.217 1.871 1.871 0 0 1-2.059 1.763 12.24 12.24 0 0 1-1.73-.325m9.4-25.161c.524.472 15.133.553 15.755.145-5.179-.189-10.366-.161-15.751-.145m-10.936 23a3.28 3.28 0 0 1 2.491-2.414 19.513 19.513 0 0 1-2-.013 1.468 1.468 0 0 0-1.61.989c-.173.371-.3.762-.485 1.225l1.6.213m.255 3.883c-.1-1.278-.188-2.428-.277-3.583l-1.478-.147a3.827 3.827 0 0 0 1.756 3.729m32.026-15.783.111.208 9.084-.331v-.242c-2.9 0-5.8-.006-8.7.016-.166 0-.329.228-.494.35M17.166 6.565l-.237.131c.186.308.3.719.576.9a2.234 2.234 0 0 0 1.179.314c2.8-.01 5.595-.057 8.392-.1a1.071 1.071 0 0 0 .3-.1v-.194a3.662 3.662 0 0 0-.613-.091c-2.527.044-5.054.087-7.581.157a1.837 1.837 0 0 1-2.022-1.016m11.921 1.2c-.631-.49-1.016-.47-1.384 0z" fill="#fff" />
                        </g>
                    </g>
                </svg>
            </button>
            <Image loading='lazy' alt='user' src={userIcon} />
        </div>
    </header>
}

export default Header;