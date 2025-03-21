export const useCounter = (type: "basic" | "next-gent") => {
    const number = useState(`counterValue-${type}`, () => 0);

    const increment = () => {
        number.value++;
    };

    return {
        number,
        increment,
    };
};
