import React, { Component } from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg} from 'reactstrap';

class Note extends Component {
    formatNote(){
        const {note} = this.props.note
        return note === "" ? 'Empty' : note;
    }

    render() { 
        return(
        <React.Fragment>
            <Card style={{width: '200px'}}>
                <CardBody>
                    <CardText>{this.formatNote()}</CardText>
                    <button onClick ={() => this.props.onDelete(this.props.note.noteId)} className="btn btn-danger btn-sm m-2">
                        Delete Note
                    </button>
                </CardBody>
            </Card>
        </React.Fragment>);
    }
} // style={{fontSize: 16}}
export default Note;