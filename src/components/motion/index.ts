interface IFadeInProps {
    show?: any;
    hidden?: any;
    transition?: any;
}

export const variantsItemFadeIn = {
    hidden: { opacity: 0, scale: 0.1 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 50,
            bounce: 0.25,
        },
    },
};
export const fadeIn = ({ show, hidden, transition }: IFadeInProps) => {
    return {
        hidden: {
            opacity: 0,
            ...hidden,
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ...transition,
            },
            ...show,
        },
    };
};

export const movePage = {
    exit: { opacity: 0, transition: { duration: 0.5 } },
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
};

export const hoverTapMotion = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
};

export const boxQAMotion = {
    hidden: { opacity: 0, height: 0, margin: 0 },
    visible: { opacity: 1 },
};
