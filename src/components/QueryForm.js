import React, {useState} from 'react';
import { QueryResults } from './QueryResults';
import '../css/queryform.css';


function QueryForm() {
    const [track, setTrack] = useState('');
    const [artist, setArtist] = useState('');
    const [results, setResults] = useState([]);

    function queryForSongs(e) {
        // history.push('/login');
        e.preventDefault();
        console.log("CALLING QUERY");
        fetch(`${process.env.REACT_APP_BACKEND_URL}/querySpotify/querySongs/` + artist + '/' + track).then(response => response.text()).then(body => {
                console.log("returned query");
                let list = JSON.parse(body);
                let returnList = [];
                for(var i = 0; i < list.length; i++){
                    let item = list[i];
                    // returnList.push([item.songName, item.songArtist, item.songId]);
                    returnList.push({track: item.songName, artist: item.songArtist, trackId: item.songId});
                }
                setResults(returnList);
                // console.log('Setting Results' + results)
            });
        clearInputs();
    }

    function clearInputs() {
        document.getElementsByClassName('trackInput').value = '';
        document.getElementsByClassName('artistInput').value = '';
    }

    return (
        <div className='mainQueryDiv'>
            <div id='queryForm'>
                <div id='formDiv'>
                    <h3>Request a song!</h3>
                    <form>
                        <input type='text' placeholder='Song name'  className='trackInput' onChange={(e) => setTrack(e.target.value)}/>
                        <input type='text' placeholder='Artist name' onFocus="this.value=''" className='artistInput' onChange={(e) => setArtist(e.target.value)}/>
                        <div id='buttonDiv'>
                            <button className='myButton' onClick={queryForSongs}>Query Songs</button>
                            <button className='myButton' onClick={clearInputs}>Clear Input</button>
                        </div>
                    </form>
                </div>
                <QueryResults results={results}/>
            </div>
        </div>
    );
}

export default QueryForm;

