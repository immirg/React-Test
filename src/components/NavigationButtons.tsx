type Props = {
    page: number;
    prev: () => void;
    next: () => void;
    disablePrevPage: boolean;
    disableNextPage: boolean;
};

export const NavigationButtons = ({ page, prev, next, disablePrevPage, disableNextPage }: Props) => {
    return (
        <div className="block-buttons">
            <button onClick={prev} disabled={disablePrevPage}>Prev</button>
            <div>Page: {page}</div>
            <button onClick={next} disabled={disableNextPage}>Next</button>
        </div>
    );
};
