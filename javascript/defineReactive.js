class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if(Dep.target) {
      this.subscribers.add(Dep.target);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

Dep.target = null;

function defineReactive(obj, key, val) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      dep.depend();
      return val;
    },

    set(newVal) {
      if(newVal !== val) {
        val = newVal;
        dep.notify();
      }
    }
  });
}

function observe(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

function autorun(updateFn) {
  Dep.target = updateFn;
  updateFn();
  Dep.target = null;
}

const state = {
  count: 0,
  message: 'Olá'
};

observe(state);

autorun(() => {
  console.log('Re-render', state.count, state.message);
});

state.count++;
state.message = 'Oi de novo';