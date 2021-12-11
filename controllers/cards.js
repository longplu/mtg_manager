// Require dependencies
const express = require('express');
const Card = require('../models/card')
const axios = require('axios');
const BASE_URL = 'https://api.scryfall.com/cards/search';

// Create router object
const cardsRouter = express.Router();

// List our router actions
cardsRouter.get('/seed', async (req,res) => {
    const data = [
        {
            qty: 1,
            name: 'Abominable Treefolk',
            prices_usd: 0.19,
            img_uris_normal: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/e/1eddb834-ea01-44e2-afca-bd9a4ebbdb94.jpg?1562202283',
            purchase_uris_tcgplayer: 'https://shop.tcgplayer.com/product/productsearch?id=190753&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
            type_line: 'Snow Creature — Treefolk',
            mana_cost: '{2}{G}{U}',
            power: '*',
            toughness: '*',
            oracle_text: 'Trample\nAbominable Treefolk\'s power and toughness are each equal to the number of snow permanents you control.\nWhen Abominable Treefolk enters the battlefield, tap target creature an opponent controls. That creature doesn\'t untap during its controller\'s next untap step.',
            cmc: 4,
            list: 'Wishlist'
        },
        {
            qty: 1,  
            name: 'Abominable Treefolk',
            prices_usd: 0.19,
            img_uris_normal: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/e/1eddb834-ea01-44e2-afca-bd9a4ebbdb94.jpg?1562202283',
            purchase_uris_tcgplayer: 'https://shop.tcgplayer.com/product/productsearch?id=190753&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
            type_line: 'Snow Creature — Treefolk',
            mana_cost: '{2}{G}{U}',
            power: '*',
            toughness: '*',
            oracle_text: 'Trample\nAbominable Treefolk\'s power and toughness are each equal to the number of snow permanents you control.\nWhen Abominable Treefolk enters the battlefield, tap target creature an opponent controls. That creature doesn\'t untap during its controller\'s next untap step.',
            cmc: 4,
            list: 'Wishlist'
        },
        {
            qty: 1,
            name: 'Abominable Treefolk',
            prices_usd: 0.19,
            img_uris_normal: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/e/1eddb834-ea01-44e2-afca-bd9a4ebbdb94.jpg?1562202283',
            purchase_uris_tcgplayer: 'https://shop.tcgplayer.com/product/productsearch?id=190753&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
            type_line: 'Snow Creature — Treefolk',
            mana_cost: '{2}{G}{U}',
            power: '*',
            toughness: '*',
            oracle_text: 'Trample\nAbominable Treefolk\'s power and toughness are each equal to the number of snow permanents you control.\nWhen Abominable Treefolk enters the battlefield, tap target creature an opponent controls. That creature doesn\'t untap during its controller\'s next untap step.',
            cmc: 4,
            list: 'Wishlist'
        }
    ];
    await Card.deleteMany({});
    await Card.create(data);
    res.redirect('/');
});

//INDUCES

// INDEX
cardsRouter.get("/", (req, res) => {
  Card.find({}, (error, card) => {
    res.render("index.ejs", {
      cards: card,
    });
  });
});

// SEARCH
cardsRouter.get("/search", (req, res) => {
    const term = req.query.term;
    if(term) {
      res.json({ term });
    } else {
      res.render('search.ejs');
    }
});

// NEW
cardsRouter.get('/new', (req, res) => {
  res.render('new.ejs');
})

// DELETE
cardsRouter.delete('/:id', (req, res) => {
Card.findByIdAndDelete(req.params.id, (err, data) => {
  res.redirect('/')
});
});

// UPDATE
cardsRouter.put('/:id', (req, res) => {

Card.findByIdAndUpdate(
  req.params.id,
  req.body,
  {
    new: true
  },
  (err, card) => {
    res.redirect('/' + req.params.id)
  }
)
})

//CREATE
cardsRouter.post('/', (req, res) => {
  Card.create(req.body, (error, createdCard) => {
    res.redirect('/') // <-- new stuff right here
  });
});

// EDIT
cardsRouter.get('/:id/edit', (req, res) => {
Card.findById(req.params.id, (err, card) => {
  res.render('edit.ejs', {
    card
  });
});
});

// SHOW
cardsRouter.get("/:id", (req, res) => {
  Card.findById(req.params.id, (err, card) => {
    res.render("show.ejs", {
      card: card,
    });
  });
});


// Export router object to require it in server.js
module.exports = cardsRouter;
