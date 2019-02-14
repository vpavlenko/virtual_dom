(() => {

const h = (type, props, children) => {
  return {
    type,
    props,
    children,  // always an array
  };
};

const mount = (virtualNode) => {
  debugger;
  // When a child is a string
  if (typeof virtualNode === "string") {
    return document.createTextNode(virtualNode);
  }
  const { type, props, children } = virtualNode;
  const realNode = document.createElement(type);
  virtualNode._realNode = realNode;
  for (const key in props) {
    realNode.setAttribute(key, props[key]);
  }
  if (children) {
    for (const child of children) {
      realNode.appendChild(mount(child));
    }
  }
  return realNode;
};

const patch = (newVirtualNode, oldVirtualNode, parent) => {
  debugger;
  if (oldVirtualNode === newVirtualNode) {
    return;
  }
  if (!oldVirtualNode) {
    parent.appendChild(mount(newVirtualNode));
  } else if (!newVirtualNode) {
    parent.removeChild(oldVirtualNode._realNode);
  } else {
    if ()
    const realNode = oldVirtualNode._realNode;
    if (newVirtualNode.type !== oldVirtualNode.type) {
      parent.replaceChild(realNode, mount(newVirtualNode));
    }
    for (const key in newVirtualNode.props) {
      if (newVirtualNode.props[key] !== oldVirtualNode.props[key]) {
        realNode.setAttribute(key, newVirtualNode.props[key]);
      }
    }
    for (let i = 0; i < oldVirtualNode.children.length; ++i) {
      if (i < newVirtualNode.children.length) {
        patch(newVirtualNode.children[i], oldVirtualNode.children[i], realNode);
      } else {
        realNode.removeChild(oldVirtualNode.children[i]._realNode);
      }
    }
    for (let i = oldVirtualNode.children.length; i < newVirtualNode.children.length; ++i) {
      realNode.appendChild(mount(newVirtualNode.children[i]));
    }
  }

};

window.VirtualDOM = {
  h,
  mount,
  patch,
};

})();
