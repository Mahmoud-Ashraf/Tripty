import EntryPoint from "../EntryPoint/EntryPoint";

const HomeEntryPoints = () => {
    return (
        <div className="row justify-content-center my-5">
            <div className="col-10">
                <div className="row g-5">
                    <div className="col-3"><EntryPoint /></div>
                    <div className="col-3"><EntryPoint /></div>
                    <div className="col-3"><EntryPoint /></div>
                    <div className="col-3"><EntryPoint /></div>
                </div>
            </div>
        </div>
    )
}

export default HomeEntryPoints;