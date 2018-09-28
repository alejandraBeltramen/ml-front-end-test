const axios = require('axios');
const _ = require('lodash');

// ML APIs
const ML_API_SEARCH_PATH = 'https://api.mercadolibre.com/sites/MLA/search?q=';
const ML_API_ITEMS = 'https://api.mercadolibre.com/items/';
const ITEM_DESCRIPTION = '/description';

// Errors
const ERROR_1 = 'Error when requesting list of products - ML API: ';
const ERROR_2 = 'Error when requesting product - ML API: product id ';
const ERROR_3 = 'Error when requesting product description - ML API: product id ';

// response objects
const author = { name: 'Alejandra', lastname: 'Beltramen' };
const allProductsResponse = {
  author: author,
  categories: [],
  items: []
};
const productDetailsResponse = {
  author: author,
  item: {}
};

const search = {
  getAll: function(req, res, next) {
    const queryString = req.query.q;
    axios
      .get(`${ML_API_SEARCH_PATH}${queryString}`)
      .then(response => {
        const products = response.data;
        let categories;

        // re-set
        allProductsResponse.categories = [];
        allProductsResponse.items = [];

        if (_.head(products.filters) !== undefined) {
          categories = _.head(_.head(products.filters).values).path_from_root;

          _.forEach(categories, category => {
            allProductsResponse.categories.push(category.name);
          });
        } else { // if there is not any category
          allProductsResponse.categories.push('Otros');
        }

        _.forEach(products.results, item => {
          const parsedItem = {
            id: _.get(item, 'id'),
            title: _.get(item, 'title'),
            price: {
              currency: _.get(item, 'currency_id'),
              amount: _.get(item, 'price'),
              decimals: 0o0
            },
            picture: _.get(item, 'thumbnail'),
            condition: _.get(item, 'condition'),
            free_shipping: _.get(item, 'shipping.free_shipping')
          };
          allProductsResponse.items.push(parsedItem);
        });
        res.json(allProductsResponse);
      })
      .catch(error => {
        console.log(`${ERROR_1}${error}`);
      });
  },
  read: function(req, res, next) {
    const productId = req.params.id;
    axios
      .get(`${ML_API_ITEMS}${productId}`)
      .then(response => {
        const product = response.data;

        const parsedItem = {
          id: _.get(product, 'id'),
          title: _.get(product, 'title'),
          price: {
            currency: _.get(product, 'currency_id'),
            amount: _.get(product, 'price'),
            decimals: 0o0
          },
          picture: _.head(product.pictures).url,
          condition: _.get(product, 'condition'),
          free_shipping: _.get(product, 'shipping.free_shipping'),
          sold_quantity: _.get(product, 'sold_quantity'),
          description: ''
        };

        axios
          .get(`${ML_API_ITEMS}${productId}${ITEM_DESCRIPTION}`)
          .then(productDescription => {
            parsedItem.description = _.get(productDescription, 'data.plain_text');
            productDetailsResponse.item = parsedItem;

            res.json(productDetailsResponse);
          })
          .catch(error => {
            console.log(`${ERROR_3}${productId}, ${error}`);
          });
      })
      .catch(error => {
        console.log(`${ERROR_2}, ${productId}${error}`);
      });
  }
};

module.exports = search;
