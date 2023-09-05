const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createProduct = async (data, callback) => {
  try {
    const product = await Stripe.products.create({
      name: data.product_name,
      metadata: {
        product_name: data.product_name
      }
    });

    callback(null, product);
  } catch (err) {
    callback(err, null);
  }
};

exports.createPrice = async (data, callback) => {
  try {
    const price = await Stripe.prices.create({
      // eslint-disable-next-line radix
      unit_amount: parseInt(parseFloat(data.price) * 100),
      currency: data.currency || 'usd',
      recurring: { interval: data.interval },
      product: data.product.id
    });

    callback(null, price);
  } catch (err) {
    callback(err, null);
  }
};

exports.createToken = async (data, callback) => {
  try {
    const token = await Stripe.tokens.create({
      card: {
        number: data.card.number,
        exp_month: data.card.expiry_month,
        exp_year: data.card.expiry_year,
        cvc: data.card.cvv
      }
    });

    callback(null, token);
  } catch (err) {
    console.log(err);
    callback(err, null);
  }
};

exports.createCustomer = async (createData, callback) => {
  try {
    const data = createData;
    const { token } = data;
    // eslint-disable-next-line
    delete data.token;

    const customer = await Stripe.customers.create({
      source: token,
      email: data.email,
      name: data.name,
      phone: data.contactNo,
      metadata: JSON.parse(JSON.stringify(data.meta))
    });

    callback(null, customer);
  } catch (err) {
    callback(err, null);
  }
};

exports.createSubscription = async (createData, callback) => {
  try {
    const data = createData;
    const createObj = {
      customer: data.customer.id,
      items: [
        {
          price: data.price.id
        }
      ]
    };

    if (data.trial) {
      createObj.trial_period_days = data.trial.trial_period || 0;
      data.cancel_at_period_end = data.trial.cancel_at_period_end || true;
    }
    const subscription = await Stripe.subscriptions.create(createObj);

    callback(null, subscription);
  } catch (err) {
    callback(err, null);
  }
};
