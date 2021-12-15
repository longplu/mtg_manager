// Require dependencies
const express = require('express');
const Card = require('../models/card')
const axios = require('axios');
const BASE_URL = 'https://api.scryfall.com/cards/';

// Create router object
const cardsRouter = express.Router();

// List our router actions
cardsRouter.get('/seed', async (req,res) => {
    const data = [
        {
          scryfall_id: '1eddb834-ea01-44e2-afca-bd9a4ebbdb94',
            qty: 1,
            name: 'Abominable Treefolk',
            prices_usd: 0.19,
            img_uris_normal: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/e/1eddb834-ea01-44e2-afca-bd9a4ebbdb94.jpg?1562202283',
            purchase_uris_tcgplayer: 'https://shop.tcgplayer.com/product/productsearch?id=190753&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
            type_line: 'Snow Creature — Treefolk',
            mana_cost: '{2}{G}{U}',
            oracle_text: 'Trample\nAbominable Treefolk\'s power and toughness are each equal to the number of snow permanents you control.\nWhen Abominable Treefolk enters the battlefield, tap target creature an opponent controls. That creature doesn\'t untap during its controller\'s next untap step.',
            cmc: 4,
            list: 'Wishlist'
        },
        {
          scryfall_id: '1eddb834-ea01-44e2-afca-bd9a4ebbdb94',  
            qty: 1,  
            name: 'Abominable Treefolk',
            prices_usd: 0.19,
            img_uris_normal: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/e/1eddb834-ea01-44e2-afca-bd9a4ebbdb94.jpg?1562202283',
            purchase_uris_tcgplayer: 'https://shop.tcgplayer.com/product/productsearch?id=190753&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
            type_line: 'Snow Creature — Treefolk',
            mana_cost: '{2}{G}{U}',
            oracle_text: 'Trample\nAbominable Treefolk\'s power and toughness are each equal to the number of snow permanents you control.\nWhen Abominable Treefolk enters the battlefield, tap target creature an opponent controls. That creature doesn\'t untap during its controller\'s next untap step.',
            cmc: 4,
            list: 'Wishlist'
        },
        {
          scryfall_id: '1eddb834-ea01-44e2-afca-bd9a4ebbdb94',  
            qty: 1,
            name: 'Abominable Treefolk',
            prices_usd: 0.19,
            img_uris_normal: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/e/1eddb834-ea01-44e2-afca-bd9a4ebbdb94.jpg?1562202283',
            purchase_uris_tcgplayer: 'https://shop.tcgplayer.com/product/productsearch?id=190753&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
            type_line: 'Snow Creature — Treefolk',
            mana_cost: '{2}{G}{U}',
            oracle_text: 'Trample\nAbominable Treefolk\'s power and toughness are each equal to the number of snow permanents you control.\nWhen Abominable Treefolk enters the battlefield, tap target creature an opponent controls. That creature doesn\'t untap during its controller\'s next untap step.',
            cmc: 4,
            list: 'Wishlist'
        }
    ];
    await Card.deleteMany({});
    await Card.create(data);
    res.redirect('/wishlist/');
});

//INDUCES

// INDEX
cardsRouter.get("/wishlist/", (req, res) => {
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
cardsRouter.get('/wishlist/new', (req, res) => {
  res.render('new.ejs');
})

// DELETE
cardsRouter.delete('/wishlist/:id', (req, res) => {
Card.findByIdAndDelete(req.params.id, (err, data) => {
  res.redirect('/wishlist/')
});
});

// UPDATE
cardsRouter.put('/wishlist/:id', (req, res) => {  
  Card.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    },
    (err, card) => {
      res.redirect('/wishlist/')
    }
  )
  })

//CREATE
cardsRouter.post('/wishlist/', (req, res) => {
  // console.log(req.body)
  axios.get(BASE_URL + req.body.scryfall_id).then(data => {
    
    req.body.name = data.data.name
    req.body.oracle_text = data.data.oracle_text
    req.body.prices_usd = data.data.prices.usd ? data.data.prices.usd : 0
    req.body.img_uris_normal = data.data.image_uris ? data.data.image_uris.normal : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAACYCAMAAAC4aCDgAAABC1BMVEX///9EREQ/Pz80NDQxMTEtLS3Kysrf399xcXE4ODg8PDw5OTn29vaysrI+Pj6bm5vw8PBoaGjCwsJiYmJ+fn5JSUna2tqUlJRbW1t1dXUpKSnm5uZRUVG5ubkjIyOnp6fT09OKioqvnIn/+fD/7+Dt+P/c4eWioqLp6ekTExONjY3R0dGXl5fTzcbf2dPCyc+HclpAU2mbrsBwXEZncn4/XHSOemauwNG0oY1qYV2SorPn2840LyltgZSnlohhZ3E+S1TQwrNVbYFBP0eXj4ZuVTnd7ftPVVsrRV9WPDPHtKFcRSuijnnK2umaqLdZcIPCta3Izt+1tL28rq3Rw76ek5yxwMLMzcW9u8O5+Xr5AAAEfElEQVR4nO3abVfaSBgG4CfvEhIYA0ZgoEaROG1KsC+WVna7tbvr7rpiW3W3/v9fsjPhHQq4X0TPua8vZpLncMJ9ZjIzQSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjOCYLAnjT50Xa9XvW9xUJZF4iHu6+nyHMNw9weN3etvK7phZzRmC9s1AzjmT1/FqZVXU3Tt8YtQxuy9mbrmLpiIMxVGqY2FaavWq5p6PJPzZkpLOkIcw2W06bDVK3cvhNuF+TJ7enCvazLIsxVVGqTMBsyzEJZHe2ogc4ndY6lIcw1Bv1tHOaWHMpmmF3Ia1p+6qlZ1xHmGlw+IvWpMFW0+ezIMWfG+W5uUIgwl6voclRPwsyyrWSHXjYTjeoiOcjdso4wVyjK/rbj5cdh2sakk6p+aI1W7mpaOlIPVIS5TCj7mxWpGXyY4GT+kQ9JGaA5XByVXU2vk48wV1D9bZe8SZhq1nH3BxfVjGNG2WFgZjM7wlxhP6/623SYRyrM3cHVinpCJupIPQcMObEjzOVsNcjDe4S5VRjMSghzKU9uyXNFmgmz+KMw1Q7TUi+LEOZSVXe4ClrxzDQiIiGzNHx1BmEuo95v5EJPYoMwPW8QV2EU5nA2L+lq8S7ryJdR5wJ1BLOqak9uWJKZ7Sct65mctuU6s1AdFGTrTEasNrgq5VVhznq2u9k7f4TKBW2O3O6EagdUyq57ameZI2LWQl1xw7f++PwwTC9LLrvOh7kizHuo1syh7L2Rbpo1Gq7UsxdvajOUl7Gx56M601WFeRPDfAF3RkK1N9+WbZpeG5VGL+PCUR0vyjTzvuPgN7UVJksj4mpQmz55L9TJ+mwdlkbrTa0z5RYz+93CstSQtuaCQ5jrzYRJFXc00Rj7c4UIcz2vlneN8Tt1b8vK5vmC9WK+0Ldct4YwV3tZLBb9SdOuapa1Uw4X6hJZ+NJZOA2rYccIAAAAAPC4tGNK43ErbTQW/gO72XnQG3rKjl/R5evs6E2L6ODt3sK79MOTB7+pp+qd1n3/uvmhctr76WcZ5pVg9LHyC112D18dfip/ap3tlD9v+h6fjOPOr791L7v0+/nfsme+/2PrtHdCF6cyzJPDP+m4/1erhzDv67h/8XwS5kGXaBhm70SOb4T5vxz36U23+aF0Re++yDDV4/Nj6S31dvY/Z2H26uUvm75HAAAAAHishH/bERGlTpTGqSPCuM1t2UqEzTmPw7QTia/9ZseJuQi+fxMdljToJuYxHUUOC23x9ZwlTod837ET4rETJ7FIeXi96e+1GUkaXiVkB0kYRGfhTdS/jVp2O7qOOrYftZNG56Z5HlCQ2PZB61svvO51yZZX6Kx/Ed/E/4hzO/3XpsT+fhe0eMcPk9vbu3Z8t+mvtRmMMRGSYCHnKYt4KxUJCS9ieyISsSN46tmtZiLiNGZtWcsi1kpjERNT1UwkrWbIBHHBeERCdlkm5Ed4bNNfCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgMfgPZ5NcXqJLupgAAAAASUVORK5CYII='
    req.body.purchase_uris_tcgplayer = data.data.purchase_uris ? data.data.purchase_uris.tcgplayer : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAACYCAMAAAC4aCDgAAABC1BMVEX///9EREQ/Pz80NDQxMTEtLS3Kysrf399xcXE4ODg8PDw5OTn29vaysrI+Pj6bm5vw8PBoaGjCwsJiYmJ+fn5JSUna2tqUlJRbW1t1dXUpKSnm5uZRUVG5ubkjIyOnp6fT09OKioqvnIn/+fD/7+Dt+P/c4eWioqLp6ekTExONjY3R0dGXl5fTzcbf2dPCyc+HclpAU2mbrsBwXEZncn4/XHSOemauwNG0oY1qYV2SorPn2840LyltgZSnlohhZ3E+S1TQwrNVbYFBP0eXj4ZuVTnd7ftPVVsrRV9WPDPHtKFcRSuijnnK2umaqLdZcIPCta3Izt+1tL28rq3Rw76ek5yxwMLMzcW9u8O5+Xr5AAAEfElEQVR4nO3abVfaSBgG4CfvEhIYA0ZgoEaROG1KsC+WVna7tbvr7rpiW3W3/v9fsjPhHQq4X0TPua8vZpLncMJ9ZjIzQSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjOCYLAnjT50Xa9XvW9xUJZF4iHu6+nyHMNw9weN3etvK7phZzRmC9s1AzjmT1/FqZVXU3Tt8YtQxuy9mbrmLpiIMxVGqY2FaavWq5p6PJPzZkpLOkIcw2W06bDVK3cvhNuF+TJ7enCvazLIsxVVGqTMBsyzEJZHe2ogc4ndY6lIcw1Bv1tHOaWHMpmmF3Ia1p+6qlZ1xHmGlw+IvWpMFW0+ezIMWfG+W5uUIgwl6voclRPwsyyrWSHXjYTjeoiOcjdso4wVyjK/rbj5cdh2sakk6p+aI1W7mpaOlIPVIS5TCj7mxWpGXyY4GT+kQ9JGaA5XByVXU2vk48wV1D9bZe8SZhq1nH3BxfVjGNG2WFgZjM7wlxhP6/623SYRyrM3cHVinpCJupIPQcMObEjzOVsNcjDe4S5VRjMSghzKU9uyXNFmgmz+KMw1Q7TUi+LEOZSVXe4ClrxzDQiIiGzNHx1BmEuo95v5EJPYoMwPW8QV2EU5nA2L+lq8S7ryJdR5wJ1BLOqak9uWJKZ7Sct65mctuU6s1AdFGTrTEasNrgq5VVhznq2u9k7f4TKBW2O3O6EagdUyq57ameZI2LWQl1xw7f++PwwTC9LLrvOh7kizHuo1syh7L2Rbpo1Gq7UsxdvajOUl7Gx56M601WFeRPDfAF3RkK1N9+WbZpeG5VGL+PCUR0vyjTzvuPgN7UVJksj4mpQmz55L9TJ+mwdlkbrTa0z5RYz+93CstSQtuaCQ5jrzYRJFXc00Rj7c4UIcz2vlneN8Tt1b8vK5vmC9WK+0Ldct4YwV3tZLBb9SdOuapa1Uw4X6hJZ+NJZOA2rYccIAAAAAPC4tGNK43ErbTQW/gO72XnQG3rKjl/R5evs6E2L6ODt3sK79MOTB7+pp+qd1n3/uvmhctr76WcZ5pVg9LHyC112D18dfip/ap3tlD9v+h6fjOPOr791L7v0+/nfsme+/2PrtHdCF6cyzJPDP+m4/1erhzDv67h/8XwS5kGXaBhm70SOb4T5vxz36U23+aF0Re++yDDV4/Nj6S31dvY/Z2H26uUvm75HAAAAAHishH/bERGlTpTGqSPCuM1t2UqEzTmPw7QTia/9ZseJuQi+fxMdljToJuYxHUUOC23x9ZwlTod837ET4rETJ7FIeXi96e+1GUkaXiVkB0kYRGfhTdS/jVp2O7qOOrYftZNG56Z5HlCQ2PZB61svvO51yZZX6Kx/Ed/E/4hzO/3XpsT+fhe0eMcPk9vbu3Z8t+mvtRmMMRGSYCHnKYt4KxUJCS9ieyISsSN46tmtZiLiNGZtWcsi1kpjERNT1UwkrWbIBHHBeERCdlkm5Ed4bNNfCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgMfgPZ5NcXqJLupgAAAAASUVORK5CYII='
    req.body.type_line = data.data.type_line ? data.data.type_line : 'no type'
    req.body.mana_cost = data.data.mana_cost ? data.data.mana_cost : 'no mana cost'
    req.body.cmc = data.data.cmc ? data.data.cmc : 0
    req.body.qty = parseInt(req.body.qty)

  Card.create(req.body, (error, createdCard) => {
    res.redirect('/wishlist/') // <-- new stuff right here
  })});
});

// EDIT
cardsRouter.get('/wishlist/:id/edit', (req, res) => {
Card.findById(req.params.id, (err, card) => {
  res.render('edit.ejs', {
    card
  });
});
});

// SHOW
cardsRouter.get("/wishlist/:id", (req, res) => {
  Card.findById(req.params.id, (err, card) => {

    res.render("show.ejs", {
      card: card
    });
  });
});


// Export router object to require it in server.js
module.exports = cardsRouter;
