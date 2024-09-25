export function getReciepe(name) {
  if (!name) return '';

  return reciepe.find((cocktail) => cocktail.name === name)
}

export const reciepe = [
  {
    "name": "Highball",
    "method": "Build",
    "reciepe": {
      "Whisky": "45ml",
      "Soda": "to top",
      "Lemon Wedge": "Optional",
      "Ratio": "1:3 or 1:4"
    },
    "glass": "Highball"
  },
  {
    "name": "Gin Soda",
    "method": "Build",
    "reciepe": {
      "gin": "45ml",
      "soda": "to top"
    },
    "glass": "Highball"
  },
  {
    "name": "King's Valley",
    "method": "Shake",
    "reciepe": {
      "Whiskey": "60ml",
      "cointreau": "15ml",
      "Lemon juice": "15ml",
      "blue curacao": "1tsp"
    },
    "glass": "Martini"
  },
  {
    "name": "Whiskey Sour",
    "method": "Shake",
    "reciepe": {
      "Whiskey": "60ml",
      "Lemon": "20ml",
      "Sugar": "20ml",
      "Egg White": ""
    },
    "glass": "Lowball"
  },
  {
    "name": "Silent Third",
    "method": "Shake",
    "reciepe": {
      "Whiskey": "50ml",
      "cointreau": "20ml",
      "Lemon": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Mint Julep",
    "method": "Build",
    "reciepe": {
      "Whiskey": "45ml",
      "Mint": "6-8 string",
      "Sugar": "1 tbsp",
      "Crushed Ice": ""
    },
    "glass": "Highball"
  },
  {
    "name": "New York Sour",
    "method": "Shake",
    "reciepe": {
      "Whiskey": "60ml",
      "Sugar": "20ml",
      "Lemon": "20ml",
      "Egg White": "optional",
      "Red wine": "float"
    },
    "glass": "Lowball"
  },
  {
    "name": "Penicillin",
    "method": "Shake",
    "reciepe": {
      "Peat Whisky": "60ml",
      "Lemon": "20ml",
      "Honey": "5ml",
      "Ginger": "10ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Paper Plane",
    "method": "Shake",
    "reciepe": {
      "Whiskey": "20ml",
      "Amaro": "20ml",
      "Aperol": "20ml",
      "Lemon": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "God Father",
    "method": "Stir",
    "reciepe": {
      "Whiskey": "50ml",
      "amaretto": "20ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Old Fashioned",
    "method": "Stir",
    "reciepe": {
      "Whiskey": "60ml",
      "Sugar": "10ml",
      "Angostura Bitters": "1 dash",
      "Orange Bitters": "1 dash"
    },
    "glass": "Lowball"
  },
  {
    "name": "Rusty Nail",
    "method": "Stir",
    "reciepe": {
      "Whisky": "50ml",
      "Drambuie": "20ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Manhattan",
    "method": "Stir",
    "reciepe": {
      "Whiskey": "50ml",
      "Rosso Vermouth": "20ml",
      "Bitters": "1 dash"
    },
    "glass": "Martini"
  },
  {
    "name": "Boulevardier",
    "method": "Stir",
    "reciepe": {
      "Whiskey": "40ml",
      "Campari": "20ml",
      "Rosso Vermouth": "20ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Old Pal",
    "method": "Stir",
    "reciepe": {
      "Whiskey": "50ml",
      "Campari": "20ml",
      "Dry Vermouth": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Tipperary",
    "method": "Stir",
    "reciepe": {
      "Irish Whiskey": "50ml",
      "Rosso Vermouth": "25ml",
      "Green Chartreuse": "15ml",
      "Angostura Bitters": "2 dashes",
      "Garnish": "Orange Peel"
    },
    "glass": "Martini"
  },
  {
    "name": "French 75",
    "method": "Shake",
    "reciepe": {
      "Gin": "30ml",
      "Lemon": "15ml",
      "Sugar": "15ml",
      "Champagne": "90ml"
    },
    "glass": "Highball"
  },
  {
    "name": "Gin Fizz",
    "method": "Shake",
    "reciepe": {
      "Gin": "45ml",
      "Lemon": "20ml",
      "Sugar": "10ml",
      "Soda Water": "90ml"
    },
    "glass": "Highball"
  },
  {
    "name": "Gin & Tonic",
    "method": "Build",
    "reciepe": {
      "Gin": "45ml",
      "Tonic Water": "135ml",
      "Lemon": "5ml"
    },
    "glass": "Highball"
  },
  {
    "name": "Ramos Gin Fizz",
    "method": "Shake",
    "reciepe": {
      "Gin": "45ml",
      "Lemon": "30ml",
      "Cream": "60ml",
      "Egg white": "30ml",
      "Sugar": "30ml",
      "Orange Flower Water": "3 drops",
      "Vanilla Extract (Optional)": "2 drops",
      "Soda": "to top"
    },
    "glass": "Highball"
  },
  {
    "name": "20th Century",
    "method": "Shake",
    "reciepe": {
      "Gin": "45ml",
      "lillet": "10ml",
      "white cacao": "10ml",
      "lemon": "15ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Army & Navy",
    "method": "Shake",
    "reciepe": {
      "Gin ": "60",
      "Lemon": "20",
      "orgeat": "15",
      "Angostura bitters": "1 dash"
    },
    "glass": "Coupe"
  },
  {
    "name": "Bee's Knees",
    "method": "Shake",
    "reciepe": {
      "Gin": "60",
      "Honey": "15",
      "Lemon": "20"
    },
    "glass": "Martini"
  },
  {
    "name": "Clover Club",
    "method": "Shake",
    "reciepe": {
      "Gin": "60ml",
      "Grenadine": "20ml",
      "Lemon": "20ml",
      "Egg White": "15ml"
    },
    "glass": "Coupe"
  },
  {
    "name": "Million Dollar",
    "method": "Shake",
    "reciepe": {
      "Gin": "50ml",
      "Rosso Vermouth": "25ml",
      "Pineapple Juice": "25ml",
      "Grenadine": "5ml",
      "Egg White": "30ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Monkey Gland",
    "method": "Shake",
    "reciepe": {
      "Gin": "60ml",
      "Orange Juice": "20ml",
      "Absinthe": "1 dash",
      "Grenadine": "1 dash"
    },
    "glass": "Martini"
  },
  {
    "name": "Singapore Sling",
    "method": "Shake",
    "reciepe": {
      "Gin": "30ml",
      "Cointreau": "7.5ml",
      "Bénédictine": "7.5ml",
      "Heering Cherry Liquior": "15ml",
      "Pineapple Juice": "120ml",
      "Lime": "15ml",
      "Grenadine": "10ml",
      "Angostura Bitters": "1 dash"
    },
    "glass": "Highball"
  },
  {
    "name": "Yokohama",
    "method": "Shake",
    "reciepe": {
      "Gin": "45ml",
      "Vodka": "15ml",
      "Orange Juice": "20ml",
      "Grenadine": "10ml",
      "Absinthe": "rinse"
    },
    "glass": "Martini"
  },
  {
    "name": "Aviation",
    "method": "Shake",
    "reciepe": {
      "Gin": "60ml",
      "Lemon Juice": "20ml",
      "Maraschino": "15ml",
      "Violet Liqueur": "5ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Bramble",
    "method": "Shake",
    "reciepe": {
      "Gin": "60ml",
      "Lemon Juice": "20ml",
      "Sugar": "1 tsp",
      "Crème de Mûre": "15ml",
      "Garnish": "fresh blackberry"
    },
    "glass": "Lowball"
  },
  {
    "name": "Casino",
    "method": "Shake",
    "reciepe": {
      "Gin": "60ml",
      "Maraschino": "15ml",
      "Lemon Juice": "20ml",
      "Orange Bitters": "1 dash",
      "Garnish": "orange peel & cherry"
    },
    "glass": "Martini"
  },
  {
    "name": "Corpse Reviver #2",
    "method": "Shake",
    "reciepe": {
      "Gin": "22.5ml",
      "Cointreau": "22.5ml",
      "Lillet": "22.5ml",
      "Lemon Juice": "22.5ml",
      "Absinthe": "Rinse"
    },
    "glass": "Martini"
  },
  {
    "name": "Paradise",
    "method": "Shake",
    "reciepe": {
      "Gin": "40ml",
      "Apricot Brandy": "20ml",
      "Orange Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Pegu Club",
    "method": "Shake",
    "reciepe": {
      "Gin": "60ml",
      "Grand Marnier": "20ml",
      "Lime Juice": "20ml",
      "Angostura Bitters": "1 dash",
      "Orange Bitters": "1 dash"
    },
    "glass": "Martini"
  },
  {
    "name": "White Lady",
    "method": "Shake",
    "reciepe": {
      "Gin": "50ml",
      "Cointreau": "20ml",
      "Lemon Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Angel Face",
    "method": "Stir",
    "reciepe": {
      "Gin": "30ml",
      "Calvados": "30ml",
      "Apricot Brandy": "30ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Martinez",
    "method": "Stir",
    "reciepe": {
      "Gin": "45ml",
      "Rosso Vermouth": "45ml",
      "Maraschino": "1 bar spoon",
      "Angostura Bitters": "2 dash",
      "Garnish": "orange peel"
    },
    "glass": "Martini"
  },
  {
    "name": "Hanky Panky",
    "method": "Stir",
    "reciepe": {
      "Gin": "50ml",
      "Rosso Vermouth": "30ml",
      "Fernet Branca": "7.5ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Last Word",
    "method": "Shake",
    "reciepe": {
      "Gin": "30ml",
      "Green Chartreuse": "20ml",
      "Maraschino": "20ml",
      "Lime Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Martini",
    "method": "Stir",
    "reciepe": {
      "Gin": "75ml",
      "Dry Vermouth": "15ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Negroni",
    "method": "Stir",
    "reciepe": {
      "Gin": "40ml",
      "Campari": "20ml",
      "Rosso Vermouth": "20ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Tuxedo",
    "method": "Stir",
    "reciepe": {
      "Gin": "60ml",
      "Dry Vermouth": "60ml",
      "Maraschino": "1 bar spoon",
      "Absinthe": "0.5 bar spoon",
      "Orange Bitters": "3 dash"
    },
    "glass": "Martini"
  },
  {
    "name": "Vesper",
    "method": "Shake",
    "reciepe": {
      "Gin": "45ml",
      "Vodka": "15ml",
      "Lillet": "10ml",
      "Garnish": "lime peel"
    },
    "glass": "Martini"
  },
  {
    "name": "Dark 'N' Stormy",
    "method": "Shake",
    "reciepe": {
      "Dark Rum": "60ml",
      "Ginger Syrup": "20ml",
      "Soda": "to top"
    },
    "glass": "Highball"
  },
  {
    "name": "Mojito",
    "method": "Shake",
    "reciepe": {
      "White Rum": "40ml",
      "Lime Juice": "20ml",
      "Mint": "6-8 springs",
      "Sugar": "10ml",
      "Soda": "tp top"
    },
    "glass": "Highball"
  },
  {
    "name": "Painkiller",
    "method": "Shake",
    "reciepe": {
      "Dark Rum": "60ml",
      "Pineapple Juice": "120ml",
      "Orange Juice": "30ml",
      "Coconut Milk": "30ml",
      "Garnish": "orange slice & cherry & 肉荳蔻粉"
    },
    "glass": "Highball"
  },
  {
    "name": "Pina Colada",
    "method": "Shake",
    "reciepe": {
      "White Rum": "30ml",
      "Pineapple Juice": "90ml",
      "Coconut Milk": "30ml",
      "Lemon Juice": "15ml",
      "Sugar": "20ml"
    },
    "glass": "Highball"
  },
  {
    "name": "Daiquiri",
    "method": "Shake",
    "reciepe": {
      "White Rum": "60ml",
      "Lemon Juice": "20ml",
      "Sugar": "15ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Hemingway Special",
    "method": "Shake",
    "reciepe": {
      "White Rum": "60ml",
      "Grapefruit": "10ml",
      "Maraschino": "5ml",
      "Lime Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Hurricane",
    "method": "Shake",
    "reciepe": {
      "White Rum": "30ml",
      "Dark Rum": "60ml",
      "Lime Juice": "30ml",
      "Orange Juice": "30ml",
      "Passionfruit Syrup": "30ml",
      "Grenadine": "1 tsp",
      "Garnish": "cherry"
    },
    "glass": "Highball"
  },
  {
    "name": "Jungle Bird",
    "method": "Shake",
    "reciepe": {
      "Dark Rum": "30ml",
      "Campari": "30ml",
      "Pineapple Juice": "90ml",
      "Lime Juice": "15ml",
      "Sugar": "15ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Mai-Tai",
    "method": "Shake",
    "reciepe": {
      "White Rum": "30ml",
      "Dark Rum": "30ml",
      "Curacao": "15ml",
      "Orgeat": "15ml",
      "Lime Juice": "15ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Mary Pickford",
    "method": "Shake",
    "reciepe": {
      "White Rum": "45ml",
      "Pineapple Juice": "45ml",
      "Maraschino": "7.5ml",
      "Grenadine": "5ml"
    },
    "glass": "Coupe"
  },
  {
    "name": "Barracuda",
    "method": "Shake",
    "reciepe": {
      "Gold Rum": "45ml",
      "Galliano": "15ml",
      "Pineapple Juice": "60ml",
      "Lime Juice": "1 dash",
      "Prosecco": "to top"
    },
    "glass": "Highball"
  },
  {
    "name": "Old Cuban",
    "method": "Shake",
    "reciepe": {
      "Dark Rum": "45ml",
      "Lime Juice": "25ml",
      "Sugar": "15ml",
      "Angostura Bitters": "2 dash",
      "Mint": "6-8 string",
      "Prosecco": "15ml"
    },
    "glass": "Coupe"
  },
  {
    "name": "X.Y.Z.",
    "method": "Shake",
    "reciepe": {
      "Rum": "50ml",
      "Cointreau": "20ml",
      "Lemon Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Yellow Bird",
    "method": "Shake",
    "reciepe": {
      "White Rum": "40ml",
      "Galliano": "20ml",
      "Cointreau": "20ml",
      "Lime Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "El Presidente",
    "method": "Stir",
    "reciepe": {
      "White Rum": "50ml",
      "Dry Vermouth": "30ml",
      "Curacao": "10ml",
      "Grenadine": "5ml",
      "Bitters": "3 drop"
    },
    "glass": "Martini"
  },
  {
    "name": "Sea Breeze",
    "method": "Build",
    "reciepe": {
      "Vodka": "45ml",
      "Cranberry": "90ml",
      "Grapefruit": "30ml"
    },
    "glass": "Highball"
  },
  {
    "name": "Moscow Mule",
    "method": "Build",
    "reciepe": {
      "Vodka": "40ml",
      "Ginger Syrup": "20ml",
      "Lemon Juice": "15ml",
      "Soda": "to top",
      "Garnish": "Lemon weige"
    },
    "glass": "Lowball"
  },
  {
    "name": "Chi Chi",
    "method": "Shake",
    "reciepe": {
      "Vodka": "30ml",
      "Lemon Juice": "15ml",
      "Coconut Milk": "45ml",
      "Pineapple Juice": "60ml",
      "Garnish": "Umbrella"
    },
    "glass": "Hurricane"
  },
  {
    "name": "Vodka Lime",
    "method": "Shake",
    "reciepe": {
      "Vodka": "60ml",
      "Lemon Juice": "20ml",
      "Sugar": "15ml",
      "Garnish": "Lemon weige"
    },
    "glass": "Lowball"
  },
  {
    "name": "Espresso Martini",
    "method": "Shake",
    "reciepe": {
      "Vodka": "40ml",
      "Coffee Liqiuor": "20ml",
      "Espresso": "30ml"
    },
    "glass": "Coupe"
  },
  {
    "name": "Cosmopolitan",
    "method": "Shake",
    "reciepe": {
      "Vodka": "40ml",
      "Cointreau": "15ml",
      "Lime Juice": "15ml",
      "Cranberry": "30ml",
      "Garnish": "Cherry & Lemon Peel"
    },
    "glass": "Martini"
  },
  {
    "name": "French Martini",
    "method": "Shake",
    "reciepe": {
      "Vodka": "50ml",
      "Raspberry": "10ml",
      "Pineapple Juice": "40ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Lemon Drop Martini",
    "method": "Shake",
    "reciepe": {
      "Vodka": "45ml",
      "cointreau": "15ml",
      "Lemon": "30ml",
      "Limoncello": "30ml"
    },
    "glass": "Coupe"
  },
  {
    "name": "Russian Spring Punch",
    "method": "Shake",
    "reciepe": {
      "Vodka": "25ml",
      "Lemon Juice": "25ml",
      "Cassis": "15ml",
      "Sugar": "10ml",
      "Sparkling Wine": "To top"
    },
    "glass": "Highball"
  },
  {
    "name": "Black Russian",
    "method": "Build",
    "reciepe": {
      "Vodka": "50ml",
      "Coffee Liquor": "20ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "White Russian",
    "method": "Build",
    "reciepe": {
      "Vodka": "50ml",
      "Coffee Liquor": "20ml",
      "Cream": "20ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Colorado Bulldog",
    "method": "Shake",
    "reciepe": {
      "Vodka": "40ml",
      "Coffee Liquor": "20ml",
      "Cream": "20ml",
      "Cola": "to top"
    },
    "glass": "Lowball"
  },
  {
    "name": "God Mother",
    "method": "Stir",
    "reciepe": {
      "Vodka": "50ml",
      "Amaretto": "20ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Silver Wing",
    "method": "Stir",
    "reciepe": {
      "Vodka": "50ml",
      "Cointreau": "20ml",
      "Dry Vermouth": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Kamikaze",
    "method": "Shake",
    "reciepe": {
      "Vodka": "40ml",
      "Cointreau": "20ml",
      "Lemon Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "High Life",
    "method": "Shake",
    "reciepe": {
      "Vodka": "45ml",
      "Cointreau": "10ml",
      "Pineapple Juice": "45ml",
      "Egg White": "30ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Blue Monday",
    "method": "Shake",
    "reciepe": {
      "Vodka": "60ml",
      "Cointreau": "20ml",
      "Blue Curacao": "1 tsp",
      "Orange Bitters": "2 dash"
    },
    "glass": "Martini"
  },
  {
    "name": "Pornstar Martini",
    "method": "Shake",
    "reciepe": {
      "Vodka": "45ml",
      "Passion Fruit Liquor": "15ml",
      "Passion Fruit Juice": "30ml",
      "Lime Juice": "15ml",
      "Vanilla Syrup": "15ml",
      "Prosecco": "1 shot",
      "Garnish": "Half of Passion Fruit"
    },
    "glass": "Coupe"
  },
  {
    "name": "After Midnight",
    "method": "Shake",
    "reciepe": {
      "Vodka": "60ml",
      "White Cacao": "15ml",
      "Green Crème De Menthe": "15ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Horse's Neck",
    "method": "Build",
    "reciepe": {
      "Brandy": "60ml",
      "Ginger Syrup": "20ml",
      "Soda": "100ml",
      "Angostura Bitters": "1 dash",
      "Garnish": "Long Lemon Peel"
    },
    "glass": "Highball"
  },
  {
    "name": "Alexander",
    "method": "Shake",
    "reciepe": {
      "Brandy": "45ml",
      "Cacao": "30ml",
      "Cream": "30ml",
      "Garnish": "grated nutmeg"
    },
    "glass": "Coupe"
  },
  {
    "name": "Between the Sheets",
    "method": "Shake",
    "reciepe": {
      "Brandy": "30ml",
      "White Rum": "30ml",
      "cointreau": "15ml",
      "Lemon": "15ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Brandy Crusta",
    "method": "Shake",
    "reciepe": {
      "Brandy": "60ml",
      "Curacao": "10ml",
      "Lemon Juice": "10ml",
      "Maraschino": "10ml",
      "Angostura Bitters": "1 dash",
      "Garnish": "Lemon peel & Sugar"
    },
    "glass": "Martini"
  },
  {
    "name": "Porto Flip",
    "method": "Shake",
    "reciepe": {
      "Red Tawny Port Wine": "45ml",
      "Brandy": "15ml",
      "Egg Yolk": "10ml",
      "Garnish": "ground nutmeg"
    },
    "glass": "Coupe"
  },
  {
    "name": "Sidecar",
    "method": "Shake",
    "reciepe": {
      "Brandy": "50ml",
      "Cointreau": "20ml",
      "Lemon Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Stinger",
    "method": "Stir",
    "reciepe": {
      "Brandy": "50ml",
      "White Crème De Menthe": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "B and B",
    "method": "Stir",
    "reciepe": {
      "Brandy": "50ml",
      "Bénédictine": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "French Connection",
    "method": "Stir",
    "reciepe": {
      "Brandy": "50ml",
      "Amaretto": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Sazerac",
    "method": "Stir",
    "reciepe": {
      "Brandy": "60ml",
      "Absinthe": "rinse",
      "Sugar": "10ml",
      "Bitters": "1 dash"
    },
    "glass": "Lowball"
  },
  {
    "name": "Vieux Carrè",
    "method": "Stir",
    "reciepe": {
      "Brandy": "30ml",
      "Rye Whiskey": "30ml",
      "Rosso Vermouth": "30ml",
      "bénédictine": "1 tsp",
      "Angostura Bitters": "1 dash",
      "Orange Bitters": "1 dash"
    },
    "glass": "Martini"
  },
  {
    "name": "Tequila Sunrise",
    "method": "Build",
    "reciepe": {
      "Tequila": "40ml",
      "Orange Juice": "120ml",
      "Grenadine": "1 tsp"
    },
    "glass": "Highball"
  },
  {
    "name": "Paloma",
    "method": "Shake",
    "reciepe": {
      "Tequila": "60ml",
      "Grapefruit": "20ml",
      "Lime Juice": "15ml",
      "Soda": "Top",
      "Salt": "1 pinch"
    },
    "glass": "Highball"
  },
  {
    "name": "Margarita",
    "method": "Shake",
    "reciepe": {
      "Tequila": "50ml",
      "Cointreau": "20ml",
      "Lime Juice": "20ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Mocking Bird",
    "method": "Shake",
    "reciepe": {
      "Tequila": "60ml",
      "Lime Juice": "15ml",
      "Sugar": "15ml",
      "Green Crème De Menthe": "5ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Tommy's Margarita",
    "method": "Shake",
    "reciepe": {
      "Tequila": "60ml",
      "Lime Juice": "30ml",
      "Agave Syrup": "15ml",
      "Garnish": "Lime Slice"
    },
    "glass": "Lowball"
  },
  {
    "name": "Rosita",
    "method": "Stir",
    "reciepe": {
      "Tequila": "40ml",
      "Campari": "20ml",
      "Rosso Vermouth": "20ml",
      "Garnish": "Orange Peel"
    },
    "glass": "Lowball"
  },
  {
    "name": "Americano",
    "method": "Build",
    "reciepe": {
      "Campari": "30ml",
      "Rosso Vermouth": "30ml",
      "Soda": "to top"
    },
    "glass": "Highball"
  },
  {
    "name": "Bellini",
    "method": "Build",
    "reciepe": {
      "Prosecco": "100ml",
      "White Peach Puree": "50ml"
    },
    "glass": "Highball"
  },
  {
    "name": "KIR",
    "method": "Build",
    "reciepe": {
      "Dry White Wine": "90ml",
      "Crème de Cassis": "10ml"
    },
    "glass": "Coupe"
  },
  {
    "name": "Mimosa",
    "method": "Build",
    "reciepe": {
      "Prosecco": "90ml",
      "Orange Juice": "90ml"
    },
    "glass": "Coupe"
  },
  {
    "name": "Fernandito",
    "method": "Build",
    "reciepe": {
      "Fernet Branca": "50ml",
      "Cola": "to top"
    },
    "glass": "Lowball"
  },
  {
    "name": "Aperol Spritz",
    "method": "Build",
    "reciepe": {
      "Prosecco": "90ml",
      "Aperol": "60ml",
      "Soda": "30ml"
    },
    "glass": "Highball"
  },
  {
    "name": "Spumoni",
    "method": "Shake",
    "reciepe": {
      "Campari": "20ml",
      "Grapefruit": "20ml",
      "Tonic Water": "to top"
    },
    "glass": "Highball"
  },
  {
    "name": "Champagne Cocktail",
    "method": "Build",
    "reciepe": {
      "Champagne": "to top",
      "Angostura Bitters": "2 - 4 dash",
      "Sugar Cube": "1"
    },
    "glass": "Highball"
  },
  {
    "name": "Grasshopper",
    "method": "Shake",
    "reciepe": {
      "White Cacao": "30ml",
      "Green Crème De Menthe": "30ml",
      "Cream": "30ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Sex on the Beach",
    "method": "Shake",
    "reciepe": {
      "Vodka": "45ml",
      "Peach Schnapps": "15ml",
      "Orange Juice": "45ml",
      "Cranberry Juice": "45ml",
      "Garnish": "umbrella"
    },
    "glass": "Highball"
  },
  {
    "name": "Caipirinha",
    "method": "Build",
    "reciepe": {
      "Cachaça": "50ml",
      "Lime Juice": "10ml",
      "Sugar": "10ml"
    },
    "glass": "Lowball"
  },
  {
    "name": "Golden Dream",
    "method": "Shake",
    "reciepe": {
      "Galliano": "45ml",
      "Cointreau": "20ml",
      "Orange Juice": "20ml",
      "Cream": "10ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Illegal",
    "method": "Shake",
    "reciepe": {
      "Mezcal": "30ml",
      "Jamaican Overproof White Rum": "15ml",
      "Falernum": "15ml",
      "Maraschino": "1 tsp",
      "Lime Juice": "20ml",
      "Sugar": "15ml",
      "Egg White": "10ml"
    },
    "glass": "Martini"
  },
  {
    "name": "Long Island Iced Tea",
    "method": "Shake",
    "reciepe": {
      "Vodka": "15ml",
      "Tequila": "15ml",
      "Rum": "15ml",
      "Gin": "15ml",
      "Cointreau": "15ml",
      "Lemon Juice": "25ml",
      "Sugar": "20ml",
      "Cola": "to top"
    },
    "glass": "Highball"
  },
  {
    "name": "Naked and Famous",
    "method": "Shake",
    "reciepe": {
      "Mezcal": "25ml",
      "Yellow Chartreuse": "25ml",
      "Aperol": "25ml",
      "Lime Juice": "25ml"
    },
    "glass": "Martini"
  }
]
