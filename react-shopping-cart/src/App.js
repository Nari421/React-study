import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            product.price = product.price;
            return product;
        });
        this.state = {
            cart: {
                items: [],
                totalprice:0
            },
            products
        }
    }
    handleAdd=(product,operator)=>{
        console.log(product);
        if(operator === '+'){
            const items = [...this.state.cart.items];
            const itemExist = items.filter(i => i.id === product.id).length > 0;
            if(itemExist){
                const newitems = items.map(i=>{
                    if(i.id === product.id){
                        i.cartQuantity = i.cartQuantity+1;
                    }
                    return i;
                })
                let price=0;
                for(let i=0;i<items.length;i++){
                    price=price+parseInt(items[i].cartQuantity*items[i].price);
                }
               
                this.setState({
                    cart:{
                        items:newitems,
                        totalprice:price
                    }
                })
            }else{
                product.cartQuantity = 1;
                this.state.cart.items.push(product);
                console.log(this.state.cart.items.length);
                const len = this.state.cart.items.length;
                const items = [...this.state.cart.items];
                let price=0;
                for(let i=0;i<len;i++){
                    price=price+parseInt(items[i].cartQuantity*items[i].price);
                }
                this.setState({
                    cart:{
                        items:this.state.cart.items,
                        totalprice:price
                    }
                })
            }
        }else if(operator==='-'){
            const items = [...this.state.cart.items];
            const newitems = items.map(i=>{
                if(i.id === product.id){
                    i.cartQuantity = i.cartQuantity-1;
                }return i;
            }).filter(i=>i.cartQuantity>0);
            let price=0;
                for(let i=0;i<items.length;i++){
                    price=price+parseInt(items[i].cartQuantity*items[i].price);
                }
            this.setState({
                cart:{
                    items:newitems,
                    totalprice:price
                }
            })
        }
    }
    

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} handleAdd = {this.handleAdd} />
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
