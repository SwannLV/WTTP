import React, { Component } from 'react'
import './Pipeline.css'
import Card from "../Card/Card"
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Pipeline extends Component {

    constructor(){
        super();
        this.moveCard = this.moveCard.bind(this);
        
        this.state = {
            cards: [
                { id: 0, text: "0 Paul Newman", col: 0 },
                { id: 1, text: "1 Michel Berger", col: 0 },
                { id: 2, text: "2 Jean René Godart", col: 0 },
                { id: 3, text: "3 Parker Lewis", col: 0 },
                { id: 4, text: "4 Steevie Wonder", col: 1 },
                { id: 5, text: "5 Hulk Hogan", col: 1 }
            ]
        };
        
    }

    moveCard(dragItem, targetItem) {
        const { cards } = this.state;        
        const sourceIndex = cards.findIndex(card => card.id === dragItem.id);
        const targetIndex = cards.findIndex(card => card.id === targetItem.id);
        const sourceCard = cards[sourceIndex];
        const targetCard = cards[targetIndex];

        if((sourceCard.col === 0 && cards.filter(c => c.col === 0).length < 2)
            || (sourceCard.col === 1 && cards.filter(c => c.col === 1).length < 2)){
            alert(`Désolé je n'ai pas traité ce bug de 0 élément dans une colonne :)`);
            return;
        }

        sourceCard.col = targetCard.col
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[sourceIndex, 1], [targetIndex, 0, sourceCard]],
				},
			}),
		)
	}

    render() {
        const { cards } = this.state;
        console.log('todo: ', this.todo)
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

export default DragDropContext(HTML5Backend)(Pipeline)