createFirstPage()
let typeOfPieces = ["Fruits","Colors","Animals","Places","All Pieces"]
let wordsOrImagesGame, numberOfPieces, allGamePieces, inGamePieces, challengeOrCasual, challengeLevel, pieceOneId, pieceTwoId, pieceOne, pieceTwo
let switchOne = false
let switchTwo = false
let countToWin = 0

function changeBoard(boardContent){
	document.getElementById("board").innerHTML = boardContent
}
function createFirstPage(){
	//countToWin = 0
	boardContent = `<div class="startMenu" onclick="getChallengeOrCasual('challenge')">Challenge Game</div>`+`<div class="startMenu" onclick="getChallengeOrCasual('casual')">Casual Game</div>`
	changeBoard(boardContent)
}
function getChallengeOrCasual(elem){
	challengeOrCasual = elem
  if (challengeOrCasual == "challenge"){
  	return getWordsOrImages()
  } else {
  	return getNumberOfPieces()
  }
}
function getNumberOfPieces(){
	boardContent = `<div onclick="getWordsOrImages(4)" class="piece" >4</div>` + `<div onclick="getWordsOrImages(8)" class="piece">8</div>`
  changeBoard(boardContent)
}
function getWordsOrImages(elem){
	if (challengeOrCasual == "challenge"){
  challengeLevel = 0
  numberOfPieces = 4
  } else {
  numberOfPieces = elem
  }
	boardContent = `<div class="startMenu" onclick="getTypeOfPieces('words')">Words</div>`+`<div class="startMenu" onclick="getTypeOfPieces('images')">Images</div>`
  changeBoard(boardContent)
}
function getTypeOfPieces(elem){
	wordsOrImagesGame = elem
	boardContent = ""
	for (x in typeOfPieces){
  	boardContent = boardContent + `<div class="startMenu" onclick="generateGamePieces(typeOfPieces[${x}])" type-of-piece="${typeOfPieces[x]}">${typeOfPieces[x]}</div>`
  }
  changeBoard(boardContent)
}
function generateGamePieces(elem){
	if (elem == "Fruits"){
  	allGamePieces = ["Apple", "Banana", "Cherry", "Mango", "Orange", "Avocado", "Peach", "Plum", "Blueberry", "Strawberry", "Grape", "Lemon", "Lime", "Kiwi", "Pineapple"]
  } else if (elem == "Colors"){
  	allGamePieces = ["Red", "Blue", "Black", "White", "Green", "Purple", "Yellow", "Cyan", "Magenta", "Pink", "Beije", "Grey", "Brown", "Orange", "Eggshell"]
  } else if (elem == "Animals"){
  	allGamePieces = ["Shark", "Blue Whale", "Ape", "Canary", "Chicken", "Turkey", "Gorila", "Dog", "Cat", "Rabbit", "Mouse", "Ant", "Pig", "Cow", "Salmon"]
  } else if (elem == "Places"){
  	allGamePieces = ["Paris", "London", "Brussels", "Amsterdan", "Rio de Janeiro", "Madrid", "Lisboa", "Oslo", "Vilnius", "Warsaw", "Saint Petersburg", "Buenos Aires", "New York", "Dublin", "Venice"]
  } else if (elem == "All Pieces"){
  	allGamePieces = ["Paris", "London", "Brussels", "Amsterdan", "Rio de Janeiro", "Madrid", "Lisboa", "Oslo", "Vilnius", "Warsaw", "Saint Petersburg", "Buenos Aires", "New York", "Dublin", "Venice", "Shark", "Blue Whale", "Ape", "Canary", "Chicken", "Turkey", "Gorila", "Dog", "Cat", "Rabbit", "Mouse", "Ant", "Pig", "Cow", "Salmon", "Red", "Blue", "Black", "White", "Green", "Purple", "Yellow", "Cyan", "Magenta", "Pink", "Beije", "Grey", "Brown", "Orange", "Eggshell", "Apple", "Banana", "Cherry", "Mango", "Orange", "Avocado", "Peach", "Plum", "Blueberry", "Strawberry", "Grape", "Lemon", "Lime", "Kiwi", "Pineapple"]
  }
  startRound()
}
function startRound(){
	if (challengeOrCasual == "challenge"){
  	numberOfPieces += challengeLevel
  }
	shufflePieces(allGamePieces)
  getInGamePieces()
  shufflePieces(inGamePieces)
  generateBoard()
}
function shufflePieces(elem){
	for (i=0 ; i < elem.length -1 ; i++){
  	let tempPiece = elem[i]
 		let newPosition = Math.floor(Math.random()*elem.length)
 		elem[i] = elem[newPosition]
 		elem[newPosition] = tempPiece    
  }
}
function getInGamePieces(){
	inGamePieces = []
	for (i=0 ; i < numberOfPieces/2;){
  	inGamePieces.push(allGamePieces[i], allGamePieces[i])
        i++
   }
}
function generateBoard(){
	boardContent = ""
	for (i = 0 ; i < inGamePieces.length ; i++){
  	boardContent += `<div id="piece${i}" class="piece" onclick="clickOnPiece(${i})" is-it-clicked="false" piece-value="${inGamePieces[i]}">${inGamePieces[i]}</div>`
  }
  changeBoard(boardContent)
}
function restartGame(){
	createFirstPage()
  countToWin = 0
}
function clickOnPiece(elem){
	if (switchTwo == false){
	let temporaryElement = document.getElementById("piece"+elem)
  if (temporaryElement.getAttribute("is-it-clicked")=="false"){
  	temporaryElement.className = "pieceClicked"
  	if (switchOne == false){
    	pieceOne = temporaryElement.getAttribute("piece-value")
      pieceOneId = "piece"+elem
      switchOne = true
      temporaryElement.setAttribute("is-it-clicked","true")
    } else {
    	switchTwo = true
    	pieceTwo = temporaryElement.getAttribute("piece-value")
      temporaryElement.setAttribute("is-it-clicked","true")
      pieceTwoId = "piece"+elem
      switchOne = false
    	setTimeout(() => {comparePieces()}, 1000);
      }
  }
  }
}
function comparePieces(){
	if (pieceOne == pieceTwo){
  countToWin += 1
  	if (countToWin == numberOfPieces/2){
    	endGame()
    }
  } else {
  document.getElementById(pieceOneId).className = "piece"
  document.getElementById(pieceTwoId).className = "piece"
  document.getElementById(pieceOneId).setAttribute("is-it-clicked","false")
  document.getElementById(pieceTwoId).setAttribute("is-it-clicked","false")
  }
  switchTwo = false
}
function endGame(){
	boardContent = `<h2>You Won!</h2>`
  if (challengeOrCasual == "challenge"){
  	numberOfPieces += 2
    countToWin = 0
  	boardContent += `<div class="nextLevel" onclick="startRound()">Next Level</div>`
  } else {
  	boardContent += `<div onclick="restartGame()" class="nextLevel">Play Again</div>`
  }
	changeBoard(boardContent)
}
