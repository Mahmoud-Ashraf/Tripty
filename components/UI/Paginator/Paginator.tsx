import classes from './paginator.module.scss';

interface Props {
    lastPage: number,
    // pageSize: number,
    currentPage: number,
    onPageChange: (page: number) => void
}

const Paginator = ({ lastPage, currentPage, onPageChange }: Props) => {

    const renderPageNumbers = () => {
        const visiblePages: any[] = [1];

        if (currentPage > 3) {
            visiblePages.push('...');
            visiblePages.push(currentPage - 1);
        } else if (currentPage === 3) {
            visiblePages.push(currentPage - 1);
        }

        // Add the selected page
        if (currentPage !== 1 && currentPage !== lastPage) {
            visiblePages.push(currentPage);
        }

        if (currentPage < lastPage - 2) {
            visiblePages.push(currentPage + 1);
            visiblePages.push('...');
        } else if (currentPage === lastPage - 2) {
            visiblePages.push(currentPage + 1);
        }

        // Add the last page
        if (lastPage > 1) {
            visiblePages.push(lastPage);
        }
        return visiblePages;
    };

    const handlePrev = () => {
        if (currentPage > 1)
            onPageChange(currentPage - 1);
    }
    const handleNext = () => {
        if (currentPage < lastPage)
            onPageChange(currentPage + 1);
    }

    return (
        <div className={classes.container}>
            {/* <div className={classes.paginator}> */}
            <button disabled={currentPage <= 1} onClick={handlePrev}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem', height: '1.5rem' }} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.63599L15.778 7.04999L10.828 12Z" fill={currentPage > 1 ? "#686460" : "#C8C6C3"} />
                </svg>
            </button>
            {
                renderPageNumbers().map((page, i) => {
                    if (isNaN(page)) {
                        return (
                            <span key={i}>{page}</span>
                        )
                    } else {
                        return (
                            <span key={i} onClick={() => onPageChange(page)} className={`${classes.page} ${currentPage === page && classes.selected}`}> {page}</span>
                        )
                    }
                })
            }
            <button disabled={currentPage >= lastPage} onClick={handleNext}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem', height: '1.5rem' }} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13.1727 12L8.22266 7.04999L9.63666 5.63599L16.0007 12L9.63666 18.364L8.22266 16.95L13.1727 12Z" fill={currentPage < lastPage ? "#686460" : "#C8C6C3"} />
                </svg>
            </button>
            {/* </div> */}
        </div>
    )
}

export default Paginator;