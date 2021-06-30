import React from 'react'
import Griddle, {RowDefinition, ColumnDefinition} from 'griddle-react';
import { selectors } from 'griddle-react';
import { connect } from 'react-redux';
// import styled from 'styled-components';
import '../css/queryresults.css';

export const QueryResults = (props) => {
    function playSong(e, songId){
        e.preventDefault();
        fetch('http://localhost:5000/querySpotify/playSong/' + songId).then(response => response.text()).then(body => {
                console.log(body);
            });
    }

    function queueSong(e, songId) {
        e.preventDefault();
        fetch('http://localhost:5000/querySpotify/queueSong/' + songId).then(response => response.text()).then(body => {
                console.log(body);
            });
    }

    const griddleLayout = ({Table}) => (
        <div>
            <Table/>
        </div>
    );

    const EnhanceWithRowData = connect((state, props) => ({
        rowData: selectors.rowDataSelector(state, props)
      }));

    function PlaySongButton({ value, griddleKey, rowData }) {
    return (
        <div className="MyCustomComponent">
        <button className='myButton' onClick={(e) => playSong(e, rowData.trackId)}>Play Song</button>
        </div>
    );
    }

    function QueueSongButton({ value, griddleKey, rowData }) {
        return (
            <div className="MyCustomComponent">
            <button className='myButton' onClick={(e) => queueSong(e, rowData.trackId)}>Queue Song</button>
            </div>
        );
    }

//     const StyledTrackColumn = styled.div`
//         word-wrap: break-word;
//     `;

    // const trackColumnComponent = ({value}) => {
    //     return (
    //         <span style={{ wordWrap: "break-word", maxWidth: "100px" }}>{value}</span>
    //     )
        
    // }

    return (
            <div className='griddleTable'>
                <Griddle data={props.results} components={{
                    Layout: griddleLayout
                }}>
                    <RowDefinition>
                        <ColumnDefinition id='track' title='Song Name' width={210}/>
                        <ColumnDefinition id='artist' title='Artist' width={210}/>
                        <ColumnDefinition id='playSong' title='Play Song' customComponent={EnhanceWithRowData(PlaySongButton)} />
                        <ColumnDefinition id='queueSong' title='Queue Song' customComponent={EnhanceWithRowData(QueueSongButton)} />
                    </RowDefinition>
                </Griddle>
            </div>
    );
}

