class Component {
  constructor() {
    console.log('constructor called');
  }


}

const createElement = (component, props, content) => {
  if (typeof component === "string") {
    const element = document.createElement(component);
    element.appendChild(document.createTextNode(content));
    return element;
  }
};

const render = (element, container) => {
  debugger;
  container.innerHTML = '';
  container.appendChild(element);
};

window.VirtualDOM = {
  Component,
  createElement,
  render,
};
