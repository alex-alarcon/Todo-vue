export default {
  install: (Vue) => {
    Vue.prototype.$validator = {
      base(value) {
        if (value === null || value === undefined) {
          return true;
        }
        if (value && value.constructor === Array) {
          return value.length === 0;
        } else if (typeof value === 'object') {
          return Object.keys(value).length === 0;
        } else if (typeof value === 'string') {
          return value.length === 0;
        } else if (typeof value === 'number') {
          return value === 0;
        } else if (!value) {
          return true;
        }
        return false;
      },
      isEmpty(...args) {
        for(let arg of args) {
          if (this.base(arg)) return true;
        }

        return false;
      } 
    }
  }
}