# SearchBar Class

The `SearchBar` class provides a customizable search bar component for web applications. Users can integrate this class to create a search functionality with various customization options.

## Constructor

```js
constructor(container, options, callback)
```

-   `container`: The DOM element to which the search bar will be appended.
-   `options`: An object containing configuration options for the search bar.
    -   `url`: The URL from which to fetch data.
    -   `filter`: An array of items to be filtered (optional).
    -   `styles`: Custom CSS styles for the search bar (optional).
        -   `searchbarSize`: Size of the search bar (default: "40px").
        -   `inputSize`: Size of the input field (default: "360px").
        -   `backgroundIconColor`: Background color of the search icon (default: "#F0F8FF").
        -   `iconColor`: Color of the search icon (default: "black").
        -   `clearIconColor`: Color of the clear icon (default: "#999").
        -   `iconSize`: Size of the search icon (default: "20px").
        -   `position`: Specifies the type of positioning method used for the search bar (default: "relative"). Other possible values include "absolute", "fixed", "sticky", and "static".
        -   `right`: Controls the right offset of the search bar. It can be used to adjust the position of the search bar within its container (default: "0px").
    -   `filterProperty`: The property of each item to filter on.
    -   `triggerWhen`: Event trigger for updating search results (`click`, `keyup`, or `keydown`) default value: "click".
-   `callback`: A function to be called whenever the search results are updated.

## Methods

### `createSearchBar()`

Creates and appends the search bar HTML elements to the specified container. Also handles user interactions such as clicking the search icon or typing in the input field.

### `getResults()`

Returns the filtered search results.

## Usage

### CDN

```js
import  SearchBar  from  "https://unpkg.com/fun-search-bar@1.1.0/index.js";

function Search() {
    const searchBar = new SearchBar(container, {
      url: "example.com/data",
      filter: "products",
      filterProperty: "title"
    }, () => {
      const results = searchBar.getResults();
      console.log(results);
    });
    searchBar.createSearchBar();
}
Search();
```
### NPM

```
npm i fun-search-bar
```
```js
<body>
<div  class="search-bar"></div>
</body>
<script  type="module">
import  SearchBar  from  "./index.js";

const  container  =  document.querySelector(".search-bar");
const  url  =  "./items.json";  

const  searchBar  =  new  SearchBar(
container,
{
url:  url,
filter:  "products.items",
filterProperty:  "name",
},
() => {
const  results  =  searchBar.getResults();
console.log(results);
}
);

searchBar.createSearchBar();

</script>
```

This function demonstrates how to use the `SearchBar` class to create a search bar, fetch data asynchronously, and update search results based on user input. Customize the options object according to your requirements, including the `styles` object for customizing the appearance of the search bar.

## Note:

-   **`filter` vs `filterProperty`**: It's important to distinguish between the `filter` and `filterProperty` options:
    -   `filter`: This refers to an array of items that are intended to be filtered during the search operation. These items could be fetched from an external data source or provided directly by the user. If the items to be filtered are not available or if the search functionality is not based on a predefined list of items, the `filter` option should not be provided.
    -   `filterProperty`: This specifies the property of each item in the `filter` array that will be used for filtering. For example, if the `filter` array contains a list of products, the `filterProperty` might be set to `"name"` to filter the products based on their names.