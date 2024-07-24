import { useEffect, useState } from 'react';

type CountdownType = 'minutes' | 'seconds';

const useTimeCountdown = (start: number, type: CountdownType) => {
    const [remainingTime, setRemainingTime] = useState(start);
    const [formattedTime, setFormattedTime] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const reset = () => {
        setRemainingTime(start);
        setIsComplete(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    clearInterval(interval);
                    setIsComplete(true);
                    return 0;
                }
                return newTime;
            });
        }, type === 'minutes' ? 60000 : 1000);

        return () => {
            clearInterval(interval);
        };
    }, [start, type]);

    useEffect(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        setFormattedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, [remainingTime]);

    return { formattedTime, isComplete, reset };
};

export default useTimeCountdown;
