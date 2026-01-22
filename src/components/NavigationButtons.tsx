type Props = {
    page: number;
    prev: () => void;
    next: () => void;
    disablePrev: boolean;
};

export const NavigationButtons = ({ page, prev, next, disablePrev }: Props) => {
    return (
        <div className="block-buttons">
            <button onClick={prev} disabled={disablePrev}>Prev</button>
            <div>Page: {page}</div>
            <button onClick={next}>Next</button>
        </div>
    );
};
