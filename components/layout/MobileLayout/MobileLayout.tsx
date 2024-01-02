import ColorBox from "@/components/UI/ColorBox/ColorBox";

const MobileLayout = ({ children }: any) => {
    return (
        <div className="container my-5">
            <ColorBox>
                {children}
            </ColorBox>
        </div>
    )
}

export default MobileLayout;