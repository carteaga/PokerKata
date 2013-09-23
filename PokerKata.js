Card = function (number, colour) {
	var Number = number,
		Colour = colour;
	return {
		getNumber: function () {
			return Number;
		},
		getColour: function () {
			return Colour;
		}
	}
}

Hand = function (arrayCard) {
	var MAX_NUMBER_CARDS = 5,
		cards,
		cardsGroup = {};
	if(arrayCard.hasOwnProperty('length')) {
		if(arrayCard.length <= MAX_NUMBER_CARDS) {
			cards = arrayCard;
		} else {
			console.log('hand exceeds limit 5 cards.');
		}
	} else {
		cards = [];
	}
	// order by objects
	cards.sort(function (a, b) {
		return a.getNumber() - b.getNumber();
	});
	var addCard = function(card) {
		if(cards.length < MAX_NUMBER_CARDS) {
			cards.push(card);
		}else {
			console.log('full hand');
		}
	}
	var getHand = function () {
		return cards;
	}
	var validateHand = function () {
		if(cards < MAX_NUMBER_CARDS) {
			console.log('you need 5 cards in your hand.');
			return;
		}
		cards.sort();
		groupCards();
		if(validateRoyalFlush()) {
			return HandPoker.RoyalFlush;
		} else if(validateStraightFlush()) {
			return HandPoker.StraightFlush;
		} else if(validatePoker()) {
			return HandPoker.Poker;
		} else if(validateFullHouse()) {
			return HandPoker.FullHouse;
		} else if(validateFlush()){
			return HandPoker.Flush;
		} else if(validateStraight()) {
			return HandPoker.Straight;
		} else if(validateThreeOfAKind()) {
			return HandPoker.ThreeOfAKind;
		} else if(validateTwoPair()) {
			return HandPoker.TwoPair;
		} else if(validateOnePair()){
			return HandPoker.OnePair;
		}
		return undefined;
	}
	var groupCards = function () {
		
		// clean group
		cardsGroup = {};
		for(var i = 0; i < cards.length; i ++) {
			if(cardsGroup[cards[i].getNumber()]) {
				cardsGroup[cards[i].getNumber()]++;
			}else{
				cardsGroup[cards[i].getNumber()] = 1;
			}
		}
	}
	var validateRoyalFlush = function () {
		return validateStraight() && validateFlush() && cards[0].getNumber() == CardNumber.A;
	}
	var validateStraightFlush = function () {
		return validateStraight() && validateFlush() && cards[0].getNumber() != CardNumber.A;
	}
	var validatePoker = function () {
		for(var i in cardsGroup) {
			if(cardsGroup[i] == 4) return true; 
		}
		return false;
	}
	var validateFullHouse = function () {
		var Three = 0;
		var Pair = 0;
		for(var i in cardsGroup) {
			if(cardsGroup[i]  == 3) {
				Three++;
			}else if (cardsGroup[i] == 2) {
				Pair ++;
			}
		}
		return Three && Pair;
	}
	var validateFlush = function () {
		for(var i = 0; i < cards.length; i++) {
			if(cards[0].getColour() != cards[i].getColour()) {
				return false;
			}
		}
		return true;
	}
	var validateStraight = function() {
		for(var i = 0; i < cards.length - 1; i++) {
			if(cards[i + 1].getNumber() -  cards[i].getNumber() != 1) {
				// Case K - A = 12
				if(cards[MAX_NUMBER_CARDS - 1].getNumber() - cards[0].getNumber() != 12) {
					return false;
				}
			}
		}
		return true;
	}
	var validateThreeOfAKind = function () {
		var Three = 0;
		for(var i in cardsGroup) {
			if(cardsGroup[i] >= 3) {
				Three += cardsGroup[i] / 3;
			}
		}
		return Three >= 1;
	}
	var validateTwoPair = function () {
		var Pairs = 0;
		for(var i in cardsGroup) {
			if(cardsGroup[i] >= 2) {
				Pairs += cardsGroup[i] / 2;
			}
		}
		return Pairs >= 2;
	}
	var validateOnePair = function () {
		for(var i in cardsGroup) {
			if(cardsGroup[i] >= 2) {
				return true;
			}
		}
		return false;
	}
	return {
		addCard: addCard,
		getHand: getHand,
		validateHand: validateHand
	}
}

CardNumber = {
	A: 1,
	Two: 2,
	Three: 3,
	Four: 4,
	Five: 5,	
	Six: 6,
	Seven: 7,
	Eigth: 8,
	Nine: 9,
	Ten: 10,
	J: 11,
	Q: 12,
	K: 13
}
Object.freeze(CardNumber);

CardColour = {
	Heart: 1,
	Diamond: 2,
	Clubs: 3,
	Spades: 4
}
Object.freeze(CardColour);

HandPoker = {
	RoyalFlush: 10,
	StraightFlush: 9,
	FourOfAKind: 8,
	FullHouse: 7,
	Flush: 6,
	Straight: 5,
	ThreeOfAKind: 4,
	TwoPair: 3,
	OnePair: 2,
	HighCard: 1
}
Object.freeze(HandPoker);