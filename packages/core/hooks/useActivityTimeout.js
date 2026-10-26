import { useRef, useEffect } from 'react'

const resetEvents = [
  'mousedown',
  'keydown',
  'scroll',
  'click',
];

// TODO: implement a warning modal to stay logged in?
export function useActivityTimeout(time, onTimeout, isActive = true) {
  const timeout = useRef(null);

  const setTimer = () => {
    if (timeout.current) clearTimeout(timeout.current);

    console.log('setting activity timeout');
    timeout.current = setTimeout(() => {
      console.log('activity timeout activated');
      onTimeout();
    }, time);
  };

  useEffect(() => {
    const handleEvent = () => {
      if (isActive) setTimer();
    };

    if (isActive) setTimer();
    else if (timeout.current) clearTimeout(timeout.current);

    resetEvents.forEach((event) => {
      window.addEventListener(event, handleEvent);
    });

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      resetEvents.forEach((event) => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [time, isActive]);
}
