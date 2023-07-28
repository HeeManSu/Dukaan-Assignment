import clsx from 'clsx';
import {useState } from 'react';

const Tooltip = ({ children, direction, text, onLeave }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative flex cursor-pointer items-center"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => {
                setVisible(false);
                onLeave && onLeave();
            }}>
            {visible && (
                <div
                    className={clsx(
                        'absolute whitespace-nowrap rounded-md bg-black-light px-2 py-1 text-sm font-medium text-white',
                        {
                            'md:-left-4 left-8 md:bottom-0 bottom-14 -translate-x-full': direction === 'left',
                            'md:-right-4 right-8 md:bottom-0 bottom-14 translate-x-full': direction === 'right',
                        }
                    )}>
                    {text}
                </div>
            )}
            {children}
        </div>
    );
};

export default Tooltip;