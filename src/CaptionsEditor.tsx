import { clone, insert, remove, replace } from 'ramda';
import * as React from 'react';
import { Grid, Table } from 'react-bootstrap';
import parser from 'subtitles-parser';
import srtData from './data-stubs/srtData';

interface Props {
    test?: any;
}
interface State {
    srt?: any;
}
class CaptionsEditor extends React.Component<Props, State> {
    sourceInput: HTMLInputElement;
    replaceInput: HTMLInputElement;
    constructor(props: Props) {
        super(props);
        this.state = {
            srt: parser.fromSrt(srtData, true)
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRevert = this.handleRevert.bind(this);
        this.handleReplace = this.handleReplace.bind(this);
    }

    handleReplace() {
        let sourceString = this.sourceInput.value;
        let targetString = this.replaceInput.value;
        const rgxp = new RegExp(sourceString, 'g');
        let srt = this.state.srt;
        srt = srt.map( (item: any) => {
            item.text = replace(rgxp, targetString, item.text);
            return item;
        });
        this.setState({ srt: srt });
    }

    handleRevert() {
        this.setState({ srt: parser.fromSrt(srtData, true) });
    }

    handleInsert( item: any, insertType: any ) {
        let { srt } = this.state;
        let newItem = clone(item);
        let indexOffset = 0;
        if (insertType === 'before') {
            indexOffset = -1;
        }
        newItem.text = 'NEW ITEM';
        let tmp = insert(Number(item.id) + indexOffset, newItem, srt);
        tmp = this.fixIndexes(tmp);
        this.setState({ srt: tmp });
    }

    handleSave() {
        alert(parser.toSrt(this.state.srt));
    }

    handleDelete(item: any) {
        let { srt } = this.state;
        srt = remove(item.id - 1, 1, srt);
        srt = this.fixIndexes(srt);
        this.setState({ srt: srt });
    }
    // after deletion or insertation - reindex ids
    fixIndexes(arr: Array<any>) {
        return arr.map((item, index) => {
            item.id = index + 1;
            return item;
        });
    }

    handleInputChange(item: any, e: any, type: string) {
        let { srt } = this.state;
        srt = srt.map((line: any) => {
            if (line.id === item.id) {
                line[type] = e.target.value;
            }
            return line;
        });
        this.setState({ srt: srt });
    }

    render() {
        const srt = this.state.srt;
        const items = srt.map( (item: any, index: number, array: Array<any>) => {
            let validStartTime = true;
            let validEndTime = true;
            // validation - highlight fiels and mark error lines
            if (
                array[index] !== undefined && array[index - 1] &&
                array[index].startTime < array[index - 1].endTime
            ) {
                validStartTime = false;
            }
            if (
                array[index] !== undefined && array[index + 1] &&
                array[index].endTime > array[index + 1].startTime
            ) {
                validEndTime = false;
            }

            return (
                <tr key={item.id} className="one-row">
                    <td className={(!validEndTime || !validStartTime) ? 'bg-danger' : ''}>{item.id}</td>
                    <td>
                        Start Time:<br />
                        <input
                            type="text"
                            value={item.startTime}
                            className={'timer ' + (validStartTime ? '' : 'bg-warning')}
                            onChange={(e) => this.handleInputChange(item, e, 'startTime')}
                        />
                        <br />End Time:<br />
                        <input
                            type="text"
                            value={item.endTime}
                            className={'timer ' + (validEndTime ? '' : 'bg-warning')}
                            onChange={(e) => this.handleInputChange(item, e, 'endTime')}
                        />
                    </td>
                    <td>
                        <textarea
                            rows={3}
                            value={item.text}
                            className="text-area"
                            onChange={(e) => this.handleInputChange(item, e, 'text')}
                        />
                    </td>
                    <td>
                        <button
                            className="btn-info btn-xs my-btn"
                            onClick={(e) => this.handleInsert(item, 'before')}
                        >
                            Clone above
                        </button>
                        <button
                            className="btn-info btn-xs my-btn btn-danger"
                            onClick={(e) => this.handleDelete(item)}
                        >
                            delete
                        </button>
                        <button
                            className="btn-info btn-xs my-btn"
                            onClick={(e) => this.handleInsert(item, 'after')}
                        >
                            Clone below
                        </button>
                    </td>
                </tr>

            );
        });

        return (
            <Grid>
                <h3>SRT editor demo</h3>
                <button className="btn-info btn-xs line-btn" onClick={this.handleSave}>SAVE</button>
                <button className="btn-info btn-xs line-btn" onClick={this.handleRevert}>REVERT</button>
                {' '}<span>{' - '}</span>{' '}
                <input
                    type="text"
                    className="searc-and-replace "
                    ref={(sourceInput: HTMLInputElement) => { this.sourceInput = sourceInput; }}
                />
                <input
                    type="text"
                    className="searc-and-replace "
                    ref={(replaceInput: HTMLInputElement) => { this.replaceInput = replaceInput; }}
                />
                <button className="btn-info btn-xs line-btn" onClick={this.handleReplace}>Replace</button>
                <Table bordered={true} condensed={true} hover={true} responsive={true}>
                    <thead>
                    <tr >
                        <th style={{ width: '30px' }}>#</th>
                        <th style={{ width: '200px' }}>Times</th>
                        <th>Text</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </Table>
            </Grid>

        );
    }
}
export default CaptionsEditor;
