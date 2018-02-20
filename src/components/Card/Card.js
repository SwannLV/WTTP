import './Card.css'
import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash.flow';
// import PropTypes from 'prop-types'

const Types = {
    CARD: 'card'
};

/**
 * Implements the drag source contract.
 */
const cardSource = {
    beginDrag(props) {
        console.log('beginDrag: ', props);
        return props;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {            
            console.log('endDrag: didDrop');
            return;
        }
        const dragItem = props;        
        const targetItem = monitor.getDropResult();
        console.log('endDrag: ', dragItem, ' to: ', targetItem);
        props.moveCard(dragItem, targetItem);
    }
};

const cardTarget = {
    drop(props, monitor, component){
        return props;
    },
	hover(props, monitor, component) {        
		const dragId = monitor.getItem().id;
		const hoverId = props.id;
        console.log(dragId, hoverId);
	},
};

/**
 * Specifies the props to inject into your component.
 */
// function collect(connect, monitor) {
//     return {
//         connectDragSource: connect.dragSource(),
//         connectDropTarget: connect.dropTarget(),
//         isDragging: monitor.isDragging()
//     };
// }

// const propTypes = {
//     id:
//     column:
//     text: PropTypes.string.isRequired,
//     moveCard: PropTypes.func.isRequired,
//     isDragging: PropTypes.bool.isRequired,  // Injected by React DnD
//     connectDropTarget: PropTypes.func.isRequired, // Injected by React DnD
//     connectDragSource: PropTypes.func.isRequired // Injected by React DnD
//  };

class Card extends Component {
    render() {
        const { isDragging, connectDragSource, connectDropTarget  } = this.props;
        return connectDragSource(connectDropTarget(
            <div className='card'>
                {isDragging ? 'FLY !' : this.props.text}
            </div>
        ))
    }
}

// Card.propTypes = propTypes;

export default flow(
    DragSource(Types.CARD, cardSource, connect => ({connectDragSource: connect.dragSource()})),
    DropTarget(Types.CARD, cardTarget, connect => ({connectDropTarget: connect.dropTarget()}))
)(Card)