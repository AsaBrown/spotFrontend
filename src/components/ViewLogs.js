import React, {useState} from 'react';
import Griddle, {RowDefinition, ColumnDefinition} from 'griddle-react';
import { selectors } from 'griddle-react';
import { connect } from 'react-redux';
import { useInterval } from 'react-recipes';
import '../css/viewlogs.css';

export const ViewLogs = () => {
    const [logData, setLogData] = useState([]);

    const griddleLayout = ({Table}) => (
        <div>
            <Table/>
        </div>
    );

    useInterval(() => {
        console.log('using interval');
        fetch('http://localhost:5000/querySpotify/queryLogs/').then(response => response.text()).then(body => {
                setLogData(JSON.parse(body));
            });
      }, 10000);
    const EnhanceWithRowData = connect((state, props) => ({
        rowData: selectors.rowDataSelector(state, props)
      }));

    function LogComponent({ value, griddleKey, rowData }) {
        return (
            <div className="LogComponent">
                <p>{rowData.name} {rowData.action}</p>
            </div>
        );
    }

    function AlbumArtComponent({ value, griddleKey, rowData }) {
        return (
            <div className="LogComponent">
                <img src={rowData.albumArt} alt='' />
            </div>
        );
    }

    return (
        <div className='mainLogsDiv'>
            <div id='logsTable'>
                <Griddle data={logData} components={{
                    Layout: griddleLayout
                }}>
                    <RowDefinition>
                        <ColumnDefinition id='albumArt' title=' ' customComponent={EnhanceWithRowData(AlbumArtComponent)} />
                        <ColumnDefinition id='action' title='Logs' customComponent={EnhanceWithRowData(LogComponent)} />
                    </RowDefinition>
                </Griddle>
            </div>
        </div>
    )
}