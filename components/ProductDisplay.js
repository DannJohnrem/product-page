app.component('product-display', {
    template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" alt="green socks">
        <a v-bind:href="url"></a>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <!-- <ul>
          <li v-for="(size, index) in sizes" v-bind:key="index">{{ size }}</li>
        </ul> -->
        <div class="color-circle" v-for="(variant, index) in variants" v-bind:key="variant.id"
          v-on:mouseover="updateVariant(index)" v-bind:style="{backgroundColor: variant.color}"></div>
        <button class="button" v-bind:class="{disabledButton: !inStock}" v-bind:disabled="!inStock"
          v-on:click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>`,

  data() {
    return {
        product: 'Socks',
        selectedVariant: 0,
        brand: 'Vue Mastery',
        details: ['50% cotton', '30% wool', '20% polyester'],
        // sizes: ['S', 'M', 'L', 'XL'],
        variants: [{
                id: 2234,
                color: '#288F5A',
                image: './assets/images/socks_green.jpg',
                quantity: 50
            },
            {
                id: 2235,
                color: '#40546E',
                image: './assets/images/socks_blue.jpg',
                quantity: 0
            },
        ]
    }
},
methods: {
    addToCart() {
        this.cart += 1
    },
    updateVariant(index) {
        this.selectedVariant = index
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image() {
        return this.variants[this.selectedVariant].image
    }, 
    inStock() {
        return this.variants[this.selectedVariant].quantity
    }
}
}) 