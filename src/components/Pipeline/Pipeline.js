import React, { Component } from 'react'
import './Pipeline.css'
import Card from "../Card/Card"
// import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux'

class Pipeline extends Component {

    constructor(){
        super();
        this.moveCard = this.moveCard.bind(this);
        
        // this.state = {
        //     cards: [
        //         { id: 0, text: "0 Paul Newman", col: 0 },
        //         { id: 1, text: "1 Michel Berger", col: 0 },
        //         { id: 2, text: "2 Jean René Godart", col: 0 },
        //         { id: 3, text: "3 Parker Lewis", col: 0 },
        //         { id: 4, text: "4 Steevie Wonder", col: 1 },
        //         { id: 5, text: "5 Hulk Hogan", col: 1 }
        //     ]
        // };
        
    }

    moveCard(dragItem, targetItem) {
        const { store_moveCard } = this.props;  
        store_moveCard(dragItem, targetItem);
	}

    render() {
        const { cards } = this.props;
        return (
            <div className="pipeline">
                { 
                    ["A RENCONTRER", "ENTRETIEN"].map((title, i) => 
                    {return <ul className='container' key={i}>
                        <h5>{title} [ { cards.filter(card => card.col === i).length} ]</h5>
                        { cards.filter(card => card.col === i).map((card) => {
                            return <li key={card.id}><Card id={card.id} text={card.text} moveCard={this.moveCard}/></li>;
                        }) }
                    </ul>
                    }
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps', state);
    return {
        cards : state.pipeline.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        store_moveCard : (dragCard, targetCard) => dispatch({
            type: 'MOVE_CARD',
            payload: {
                dragCard,
                targetCard
            }
        })
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(DragDropContext(HTML5Backend)(Pipeline))