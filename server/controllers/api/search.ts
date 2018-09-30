const axios = require('axios');
const _ = require('lodash');
const CONSTANTS = require('./search.constants.ts');

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
  getAll: async function(req, res, next) {
    const queryString = req.query.q;
    let response;

    try {
      response = await axios.get(`${CONSTANTS.Paths.ML_API_SEARCH_PATH}${queryString}`);
      const products = response.data;
      let categories;

      // re-set
      allProductsResponse.categories = [];
      allProductsResponse.items = [];

      if (_.head(products.filters)) {
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
    } catch (error) {
      console.log(`${CONSTANTS.Errors.ERROR_1}${error}`);
    }
  },
  read: async function(req, res, next) {
    const productId = req.params.id;
    let parsedItem = {};
    let response;

    try {
      response = await axios.get(`${CONSTANTS.Paths.ML_API_ITEMS}${productId}`);
      const product = response.data;

      parsedItem = {
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
    } catch (error) {
      console.log(`${CONSTANTS.Errors.ERROR_2}, ${productId}${error}`);
    }

    try {
      response = await axios.get(
        `${CONSTANTS.Paths.ML_API_ITEMS}${productId}${CONSTANTS.Paths.ITEM_DESCRIPTION}`
      );

      parsedItem.description = _.get(response, 'data.plain_text');
      productDetailsResponse.item = parsedItem;

      res.json(productDetailsResponse);
    } catch (error) {
      console.log(`${CONSTANTS.Errors.ERROR_3}${productId}, ${error}`);
    }
  }
};

module.exports = search;
