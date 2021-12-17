<template>
  <div>
    <div>
      <ul>
        <li v-for="product in products" :key="product.id" class="price-row">
          <div>{{ product.name }}</div>
          <div class="quantity-row">
            <div class="price-quantity">Qty: {{ product.quantity }}</div>
            <div>${{ product.price / 100 }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="price-row">
      <div class="price-label">Sub-total</div>
      <div class="price-wrapper">${{ subtotal / 100 }}</div>
    </div>
    <div class="price-row">
      <div class="price-label">Shipping</div>
      <div class="price-wrapper">${{ shipping / 100 }}</div>
    </div>
    <div class="price-row">
      <div class="price-label">Total</div>
      <div class="price-wrapper">${{ total / 100 }}</div>
    </div>
    <button class="checkout-button">CHECKOUT</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 0,
      products: [],
    };
  },

  computed: {
    priceFormatted: function () {
      return this.price / 100;
    },
    subtotal() {
      return this.products.reduce((a, b) => a + b.price * b.quantity, 0);
    },
    total() {
      return this.shipping + this.subtotal;
    },
    shipping() {
      return this.products.reduce((a, b) => a + b.quantity, 0) * 399;
    },
  },

  methods: {
    addProduct(product) {
      const index = this.products.findIndex((el) => el.id === product.id);
      if (index > -1) {
        this.products[index].quantity++;
      } else {
        this.products.push({ ...product, quantity: 1, total: product.price });
      }
    },
  },
  created() {
    this.$nuxt.$on('add-product', (product) => this.addProduct(product));
  },
};
</script>

<style scoped>
.quantity-row {
  display: flex;
}
.price-quantity {
  margin-right: 15px;
}
.checkout-button {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  background: #000;
  color: #eee;
}
.price-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  margin: 10px;
  padding-bottom: 10px;
}
</style>