from random import shuffle

SUITE = 'Hearts Diamonds Spades Clubs'.split()
RANKS = '2 3 4 5 6 7 8 9 10 J Q K A'.split()

class Deck:
    """
    This is the Deck Class. This object will create a deck of cards to initiate
    play. You can then use this Deck list of cards to split in half and give to
    the players. It will use SUITE and RANKS to create the deck. It should also
    have a method for splitting/cutting the deck in half and Shuffling the deck.
    """
    whole_deck = []

    def __init__(self):
        print("Creating deck...")
        self.whole_deck = [(s,r) for s in SUITE for r in RANKS]

    def shuffle_deck(self):
        print("Shuffling Deck")
        shuffle(self.whole_deck)
    
    def split_in_half(self):
        return(self.whole_deck[:26], self.whole_deck[26:])
    
    

class Hand:
    '''
    This is the Hand class. Each player has a Hand, and can add or remove
    cards from that hand. There should be an add and remove card method here.
    '''
    def __init__(self,cards):
        self.cards = cards

    def cards_in_hand(self):
        return len(self.cards)

    def add_card(self,card):
        #print("Adding card")
        self.cards.append(card)

    def remove_card(self):
        #print("Removing card")
        return self.cards.pop(0)

    def remove_three_cards(self):
        if self.cards_in_hand() >= 3:
            to_return = self.cards[:3]
            self.cards = self.cards[3:]
            return to_return
        else:
            to_return = self.cards
            self.cards = []
            return to_return
            
        
    

class Player:
    """
    This is the Player class, which takes in a name and an instance of a Hand
    class object. The Payer can then play cards and check if they still have cards.
    """
    def __init__(self, name, hand):
        self.name = name
        self.hand = hand

    def __str__(self):
        return (self.get_name() + " has {} cards in hand".format(self.hand.cards_in_hand()))

    def get_name(self):
        return self.name
    
    def still_has_cards(self):
        if (self.hand.cards_in_hand() > 0):
            return True
        else:
            return False
    
    def play_card(self):
        c = self.hand.remove_card()
        return c
    
    def win_cards(self, cards):
        print("\n", self.get_name(), " win the round")
        for card in cards:
            self.hand.add_card(card)
    
    def cards_for_battle(self):
        return self.hand.remove_three_cards()


######################
#### GAME PLAY #######
######################
print("Welcome to War, let's begin...")
deck = Deck()
deck.shuffle_deck()
hand1 = Hand(deck.split_in_half()[0])
hand2 = Hand(deck.split_in_half()[1])

# Creating players
p1 = Player("Player1", hand1)
p2 = Player("Player2", hand2)

cards_on_table = []
round = 1
while (p1.still_has_cards() and p2.still_has_cards()):
    print("***On the START of round " + str(round) + " ***")
    print(p1)
    print(p2)
    print("Both players play a card!\n")
    card_of_p1 = p1.play_card()
    card_of_p2 = p2.play_card()

    cards_on_table.extend([card_of_p1,card_of_p2])
    print (" Cards to compare: ")
    print (p1.get_name(), "has -", card_of_p1[0], card_of_p1[1])
    print (p2.get_name(), "has -", card_of_p2[0], card_of_p2[1])
    print (" Cards on table : " ,cards_on_table[:-2])

    if ((RANKS.index(card_of_p1[1])) > (RANKS.index(card_of_p2[1]))):
        p1.win_cards(cards_on_table)
        cards_on_table = []
    elif ((RANKS.index(card_of_p1[1])) < (RANKS.index(card_of_p2[1]))):
        p2.win_cards(cards_on_table)
        cards_on_table = []
    else:
        print("\n Both players put 3 card from his deck on table for battle")
        cards_on_table.extend(p1.cards_for_battle())
        cards_on_table.extend(p2.cards_for_battle())
    print("\n***On the END of round " + str(round) + " ***")
    print ("Cards on table", cards_on_table)
    print(p1)
    print(p2)
    round += 1
    print("####################################################")