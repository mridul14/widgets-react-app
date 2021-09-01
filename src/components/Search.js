import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState("programming");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const search = async() => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                },
            });
            setResults(data.query.search);
        };
		
		if (term && !results.length){
			// if we are doing initial search then do not wait for timeout
			search();
		}
		else{
			const timeoutId = setTimeout(() => {
				if (term){
					search();
				}
			}, 1000);
			
			return (() => {
				clearTimeout(timeoutId);
			});
		}
		
    }, [term])

    const renderedResults = results.map((result) => {
        return(
            <div key={result.pageid} className="item">
				<div className="right floated content">
					<a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
				</div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
					{/*donot use dangerouslySetInnerHTML in live projects*/}
					<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        );
    });

    return (
        <div>
			<div className="ui form">
				<div className="field">
					<label>Enter Search Term</label>
					<input type="text" className="input" value={term} onChange={(event) => setTerm(event.target.value)}/>
				</div>
			</div>
			<div className="ui celled list">{renderedResults}</div>
		</div>
    );
};
export default Search;

/****************************************** useEffect() details start *******************************************
first argument for useEffect is a function,
second argument can be an empty array, or array with some values or no array at all
 empty array -> run at initial render of component
 no array -> run at initial render and run after every rerender
 array with value -> run at initial render, run after every rerender if data has changed since last render

Three ways to make request inside useEffect():
(1) define a function(and assign to a variable) inside useEffect and then immediately after the function definition, call the variable.
(2) directly define and call a function(using JS syntax)
(3) use promises

return in useEffect hook:
we are only allowed to return is another function.
So now we have two function in useEffect (1) is the callback function and (2) is the return function(refereed as cleanup function)
Now when useEffect will be called again(re-rendered) then the cleanup function will be called first and then the useEffect will go normally
 ****************************************** useEffect() details end *********************************************/