// 상품 조회

```js
query {
    getProducts {
        id, title, price
    }
}
// 상품 생성
mutation {
  createProduct(
    data: { title: "벨벳", price: 890000 }
  ) {
    id, title, price
  }
}
```
