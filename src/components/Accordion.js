import React, { useState } from 'react';
// The above declaration  can also be done like: const useState = React.useState;
const Accordion = ({ items }) => {

    const [activeIndex, setActiveIndex] = useState(null);
    // activeIndex: is a Piece of state
    // setActiveIndex: Function to change this piece of state
    // null: Initial value for this piece of state
    // names of activeIndex and setActiveIndex are not special and can be changes as per wish

    const onTitleClick = (index) => {
        setActiveIndex(index);
    };

    const renderedItems = items.map((item, index) => {

        const active = index === activeIndex ? 'active' : '';
        return (
            <React.Fragment key={item.title}>
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    });

    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>);
};
export default Accordion;