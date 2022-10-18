const state = {
	numCells: (600/40) * (600/40),
	cells: [],
	shipPosiion: 217,
	alienPositions: [
		3, 4, 5, 6, 7, 8, 9, 10,11,
    	18,19,20,21,22,23,24,25,26,
    	33,34,35,36,37,38,39,40,41,
    	48,49,50,51,52,53,54,55,56
	],
	gameover: false,
	score: 0
}

const setupGame = (element) => {
	state.element = element
	// do all things needed to draw the game
	//draw the grid
	drawGrid()
	//draw the spaceship
	drawSpaceship()
	// draw the alliens
	drawAliens()
	// add the instructions and the score
	// drawScoreboard()
}

const drawGrid = () => { //the way to write the function it's the same as function drawGrid() {
	//create the containing elemnet
	const grid = document.createElement('div')
	grid.classList.add('grid')
	//create a lot of cells 15*15 (225)
	for (let i = 0; i<state.numCells; i++) {
		//create a cell
		const cell = document.createElement('div')
		//apend the cell to the grid
		grid.append(cell)
		//store the cell in game state
		state.cells.push(cell)
	}

	//append the cells to the containing elemnet and the containing element to the app
	state.element.append(grid)
}

const drawSpaceship = () => {
	state.cells[state.shipPosiion].classList.add('spaceship')
	//find the bottom row, middle cell (find game stage), add a big image

}

const controlShip = (event) => {
	if (state.gameover)
		return
	//if the key pressed is left
	if (event.code == 'ArrowLeft'){
		moveShip('left')

	} else if (event.code == 'ArrowRight') {
		moveShip('right')
	} else if (event.code == 'Space'){
		fire()
	}
}

const moveShip = (direction) => {
	//remove image from current position
	state.cells[state.shipPosiion].classList.remove('spaceship')
	//figure out the delta
	if (direction === 'left' && state.shipPosition % 15 !== 0){
		state.shipPosiion--
	} else if (direction === 'right' && state.shipPosition % 15 !== 14) {
		state.shipPosiion++
	}
	//add image to new position
}


const fire = () => {
	//use an interval: run some code repeatedly each time after a speciefed time
	let	interval
	//laser starts at the ship position
	let laserPosition = state.shipPosiion
	interval = setInterval(() => {

		//remove the laser image
		state.cells[laserPosition].classList.remove('laser')
		//decrease (move up a row) the laser position
		laserPosition-=15
		//check we are still in bounds
		if (laserPosition < 0) {
			clearInterval(interval)
			return
		}

		//if there's an alien BOOM
		//clear the interval, remove alien image, remove the alien from the alien position, add a BOOM image,  set a timeout to remove BOOM image
		if(state.alienPositions.includes(laserPosition)) {
			clearInterval(interval)
			state.alienPositions.splice(state.alienPositions.indexOf(laserPosition), 1)
			state.cells[laserPosition].classList.remove('alien', 'laser')
			state.cells[laserPosition].classList.add('hit')
			setTimeout(() => {
				state.cells[laserPosition].classList.remove('hit')
			}, 200)
			return
		}
		//add the laser image
		state.cells[laserPosition].classList.add('laser')
	}, 100)
}

const drawAliens = () => {
	//adding the alliens to the grid -> we need to store the positions of the aliens in our game state
	state.cells.forEach((cell, index) => {
		//remove any alien images
		//add the image to the cell if the index is in the set alien position
   // reset: if cell index is currently an alien position remove it
   if (cell.classList.contains('alien')) {
	cell.classList.remove('alien')
  }
  // update: if cell index is an alien position, add alien class
  if (state.alienPositions.includes(index)) {
	cell.classList.add('alien')
  }
})
}

const play = () => {
	//start the march of the aliens
	let interval
	//starting direction
	let direction = 'right'
	interval = setInterval(() => {
		let movement
		if (direction === 'right') {
			//if right and at the edge, increase position by 15, decrease 1
			if (atEdge('right')) {
				movement = 15 - 1
				direction = 'left'
			} else {
				//if right increase the position by 1
				movement = 1
			}
		} else if (direction === 'left')
		{//if left and at the edge, increase position by 15, increase 1
			if (atEdge('left')) {
				movement = 15 + 1
				direction = 'right'
			} else {
				//if left, decrease the position by 1
				movement = -1
			}
		}

		//update the alien positions
		state.alienPositions = state.alienPositions.map(position => position + movement)
		//redraw aliens
		drawAliens()
		checkGameState(interval)
	}, 400)
	//set up the ship controls
	window.addEventListener('keydown', controlShip)
}


const atEdge = (side) => {
	if (side === 'left') {
		//are there any aliens in the left hand column
		return state.alienPositions.some(position => position % 15 === 0)
	} else if (side === 'right') {
		//are there any aliens in the right hand column
		return state.alienPositions.some(position => position % 15 === 14)
	}

}

const checkGameState = (interval) => {
	//has the alien got the bottom
	//has the alien all dead
	if (state.alienPositions.length === 0) {
		state.gameover = true
		//stop everything
		clearInterval(interval)
		drawMessage("HUMAN WINS")
	}else if (state.alienPositions.some(position => position => state.shipPosiion)) {
		clearInterval(interval)
		state.gameover = true
		//make ship go boom
		//remove the ship image  add the explosion image
		state.cells[state.shipPosiion].classList.remove('spaceship')
		state.cells[state.shipPosiion].classList.add('hit')
		drawMessage("GAME OVER")
	}
}


const drawMessage = (message) => {
	//create a message
	const messageElement = document.createElement('div')
	messageElement.classList.add('message')
	//create the heading text
	const h1 = document.createElement('h1')
	h1.innerText = message
	messageElement.append(h1)

	//append it to the app
	state.element.append(messageElement)
}
//query the page for the place to insert my game
const appElement = document.querySelector('.app')

//do all things needed to draw the game
setupGame(appElement)
//play the game - start being to able move the ship, move aliens

play()
