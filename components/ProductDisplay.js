app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
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
                    <p>Shipping: {{ shipping }}</p>
                    <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>
                    <!--<ul>
                        <li v-for="(size, index) in sizes" v-bind:key="index">{{ size }}</li>
                    </ul>-->
                    <div class="color-circle" v-for="(variant, index) in variants" v-bind:key="variant.id"
                    v-on:mouseover="updateVariant(index)" v-bind:style="{backgroundColor: variant.color}"></div>
                    <button class="button" v-bind:class="{disabledButton: !inStock}" v-bind:disabled="!inStock"
                    v-on:click="addToCart">Add to Cart</button>
                </div>
            </div>
            <review-list v-if="reviews.length" v-bind:reviews="reviews"></review-list>
            <review-form v-on:review-submitted="addReview"></review-form>
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
                    color: '#D0B534',
                    image: './assets/images/socks_yellow.jpg',
                    quantity: 50
                },
                {
                    id: 2235,
                    color: '#ADA29C',
                    image: './assets/images/socks_gray.jpg',
                    quantity: 0
                },
                {
                    id: 2236,
                    color: '#8B3E83',
                    image: './assets/images/socks_purple.jpg',
                    quantity: 50
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        }, 
        addReview(review) {
            this.reviews.push(review)
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
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            } else {
                return 2.99
            }
        }
    }
})