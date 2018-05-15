export default {
  install: (Vue) => {
    Vue.prototype.$storage = {
      save(data) {
        try {
          localStorage.setItem("todos", JSON.stringify(data));
        } catch(e) {
          console.log("Error: cannot save the data. " + e.message());
        }
      },
      getData() {
        try {
          return JSON.parse(localStorage.getItem("todos"));
        } catch(e) {
          console.log("Error: cannot get the data. " + e.message());
          return [];
        }
      }
    }
  }
}