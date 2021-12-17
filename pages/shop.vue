<template>
  <div class="shop-page">
    <h1>The Cup Store</h1>

    <AppProducts
      v-for="product in products"
      :product="product"
      :key="product.id"
    ></AppProducts>

    <AppCart></AppCart>
  </div>
</template>

<script>
import image1 from '../static/cups1.jpg';
import image2 from '../static/cups2.jpg';
import image3 from '../static/cups3.jpg';

export default {
  data: () => ({
    products: [
      {
        id: 120,
        name: 'Colorful Cups',
        price: 999,
        image: image1,
      },
      {
        id: 121,
        name: 'Coffee & Home',
        price: 1499,
        image: image2,
      },
      {
        id: 122,
        name: 'Old Red Friend',
        price: 1999,
        image: image3,
      },
    ],
  }),
};
</script>

<style >
body {
  padding: 15px 0;
  font-size: 14px;
  background: #eeffff;
  color: #888;
}
h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 15px;
}
</style>
