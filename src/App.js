import React from 'react';
import Accordion from './components/Accordion';

const items = [
    {
        title : 'What is React?',
        content: 'React is a front-end JavaScript framework.'
    },
    {
        title: 'Why use React?',
        content: 'React s one if the favourite JS library among engineers.'
    },
    {
        title: 'How do you use React?',
        content: 'You use react by creating components.'
    }
];

export default () => {
    return <div><Accordion items={items}/></div>;
};