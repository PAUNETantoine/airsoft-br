export const randomOffset = (min: number, max: number) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = min + Math.random() * (max - min);

    return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance
    };
}
