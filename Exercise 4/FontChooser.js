class FontChooser extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			min: +props.min,
			max :+props.max,
			size: +props.size, // make it a number
			text: props.text,
			bold: (props.bold === 'true'), // make it a boolean
		}
		if (+this.props.size < +this.props.min && +this.props.min <= 0)  {
			this.state = {size: 1}
		} else if (+this.props.size < +this.props.min) {
			this.state = {size: +this.props.min}
		} else if (+this.props.size > +this.props.max) {
			this.state = {size: +this.props.max}
		}
    }
	
	handleClick() {
		document.getElementById('boldCheckbox').hidden = !document.getElementById('boldCheckbox').hidden
		document.getElementById('decreaseButton').hidden = !document.getElementById('decreaseButton').hidden
		document.getElementById('fontSizeSpan').hidden = !document.getElementById('fontSizeSpan').hidden
		document.getElementById('increaseButton').hidden = !document.getElementById('increaseButton').hidden
		
	}

	handleCheckbox() {
		if (document.getElementById('boldCheckbox').checked) {
			this.setState({bold: true})
		} else if (!document.getElementById('boldCheckbox').checked) {
			this.setState({bold: false})
		}
	}

	handleDecreaseButton() {
		var min;

		if (+this.props.min <= 0) {
			min = 1
			this.setState({min: min})
		} else {
			min = +this.props.min
			this.setState({min: min})
		}

		if (this.state.size > min) {
			this.setState({size: this.state.size - 1})
		}
	}

	handleIncreaseButton() {
		var max;

		if (+this.props.min > +this.props.max) {
			max = +this.props.min
			this.setState({max: max})
		} else {
			max = +this.props.max
			this.setState({max: max})
		}
		if (this.state.size < max) {
			this.setState({size: this.state.size + 1})
		} 
	}

	handleDoubleClick() {
		this.setState({size: +this.props.size})
	}

	render() {
		var toggleFontWeight = this.state.bold ? 'bold' : 'normal'
		var minState = this.state.min
		var maxState = this.state.max
		var size = this.state.size
		var color = size == minState || size == maxState ? 'red' : 'black'
		
		return(
			<div>
			<input type="checkbox" id="boldCheckbox" hidden='true' checked ={this.state.bold} onChange={this.handleCheckbox.bind(this)}/>
			<button id="decreaseButton" hidden='true' onClick={this.handleDecreaseButton.bind(this)}>-</button>
			<span id="fontSizeSpan" hidden='true' onDoubleClick={this.handleDoubleClick.bind(this)}>{size}</span>
			<button id="increaseButton" hidden='true' onClick={this.handleIncreaseButton.bind(this)}>+</button>
			<span id="textSpan" onClick={this.handleClick.bind(this)} style={{fontWeight: toggleFontWeight, fontSize: size, color: color}}>{this.props.text}</span>
			</div>
		);
    }
}

