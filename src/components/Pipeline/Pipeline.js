import React, { Component } from 'react'
import './Pipeline.css'
import Card from "../Card/Card"
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'
import { action_moveCard } from '../../actions/pipeline'

class Pipeline extends Component {

    constructor(){
        super();
        this.moveCard = this.moveCard.bind(this);        
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
        store_moveCard : (dragCard, targetCard) => action_moveCard(dragCard, targetCard)(dispatch)
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(DragDropContext(HTML5Backend)(Pipeline))
