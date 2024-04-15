class SearchBar {
  constructor(container, options = {}, callback = () => {}) {
    this.container = container;
    this.url = options.url;
    this.filter = options.filter || [];
    this.styles = options.styles || {};
    this.filterProperty = options.filterProperty;
    this.triggerWhen = options.triggerWhen || "click";
    this.filteredResults = [];
    this.callback = callback;
  }

  async getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async updateSearchResults(value_search) {
    try {
      if (!this.url) return console.error("URL is required");
      if (!this.filterProperty) return console.error("Filter property is required");

      const data = await this.getData(this.url);
      if (!data) return console.error("Data not available for filtering");

      let items = data;
      if (this.filter.length > 0) {
        items = this.filter.split(".").reduce((obj, key) => obj[key], data);
        if (!items) return console.error(`Not found filter path: ${this.filter}`);
      }

      this.filteredResults = items.filter(item =>
        item[this.filterProperty].toLowerCase().includes(value_search.toLowerCase())
      );
    } catch (error) {
      console.error(`Not found filter property: ${this.filterProperty}`);
      this.filteredResults = [];
    }
  }

  async createSearchBar() {
    const fragment = document.createDocumentFragment();
  
    // Create search bar elements
    const searchBar = document.createElement("div");
    searchBar.className = "search";
    const icon = document.createElement("div");
    icon.className = "icon";
    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";
    icon.appendChild(searchIcon);
    searchBar.appendChild(icon);
    const inputContainer = document.createElement("div");
    inputContainer.className = "input";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type to Search...";
    input.autocomplete = "off";
    inputContainer.appendChild(input);
    const clear = document.createElement("div");
    clear.className = "clear";
    inputContainer.appendChild(clear);
    searchBar.appendChild(inputContainer);
    fragment.appendChild(searchBar);
  
    // Add CSS for search bar
    const cssIcon = document.createElement("link");
    cssIcon.rel = "stylesheet";
    cssIcon.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
    fragment.appendChild(cssIcon);
  
    // Add custom styles for search bar
    const defaultStyles = `
      :root {
        --search-width-height: ${this.styles.searchbarSize || "40px"};
        --search-active-width: ${this.styles.inputSize || "360px"};
        --search-background-color: ${this.styles.backgroundIconColor || "#F0F8FF"};
        --search-icon-color: ${this.styles.iconColor || "black"};
        --search-clear-icon-color: ${this.styles.clearIconColor || "#999"};
        --search-icon-size: ${this.styles.iconSize || "20px"};
      }
      .search {
        width: var(--search-width-height);
        height: var(--search-width-height);
        transition: width 0.5s;
        background-color: var(--search-background-color);
        overflow: hidden;
        position: relative;
        border-radius: 60px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
          rgba(17, 17, 26, 0.05) 0px 8px 32px;
      }
      .search.active {
        width: var(--search-active-width);
        background-color: #fff;
      }
      .search .icon {
        top: 0;
        left: 0;
        width: var(--search-width-height);
        height: var(--search-width-height);
        display: flex;
        z-index: 1000;
        cursor: pointer;
        position: absolute;
        border-radius: 60px;
        align-items: center;
        justify-content: center;
      }
      .search .icon i {
        color: var(--search-icon-color);
        font-size: var(--search-icon-size);
      }
      .search .input {
        left: var(--search-width-height);
        width: calc(var(--search-active-width) - var(--search-width-height));
        height: var(--search-width-height);
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
      }
      .search .input input {
        box-sizing: border-box;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 18px;
        padding: 10px 0;
        position: absolute;
      }
      .clear {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: var(--search-clear-icon-color);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .clear::after {
        content: "\\00d7";
        font-size: 25px;
      }`;
      
    const style = document.createElement("style");
    style.innerHTML = defaultStyles;
    fragment.appendChild(style);
  
    // Append created elements to the container
    this.container.appendChild(fragment);
  
    // Toggle search bar on icon click
    const toggleSearchBar = () => {
      searchBar.classList.toggle("active");
    };
    icon.addEventListener("click", toggleSearchBar);
  
    // Clear search input on clear button click
    clear.addEventListener("click", () => {
      toggleSearchBar();
      input.value = "";
    });
  
    const triggerEvents = {
      keyup: "keyup",
      click: "click"
    };
    const triggerEvent = triggerEvents[this.triggerWhen];

    if (!triggerEvent) {
      console.error("Invalid trigger event");
      return;
    }
    
    if (triggerEvent === "click") {
      icon.addEventListener(triggerEvent, async () => {
        if (input.value === "") return;
        await this.updateSearchResults(input.value);
        input.value = "";
        if (!this.callback) {
          console.error("Create a callback function to get the search results");
        } else {
          this.callback();
        }
      });
    } else {
      input.addEventListener(triggerEvent, async (e) => {
        if (e.target !== input || e.target.value === "") return;
        await this.updateSearchResults(e.target.value);
        if (!this.callback) {
          console.error("Create a callback function to get the search results");
        } else {
          this.callback();
        }
      });
    }
  }
  

  getResults() {
    return this.filteredResults;
  }
}

export default SearchBar;
