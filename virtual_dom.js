(() => {

const h = (type, props, children) => {
  return {
    type,
    props,
    children: children.map(child => typeof child === "string" ? {isTextNode: true, text: child} : child),
  };
};

const mount = (virtualNode) => {
  if (virtualNode.isTextNode) {
    const realNode = document.createTextNode(virtualNode.text);
    virtualNode._realNode = realNode;
    return realNode;
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
  if (oldVirtualNode === newVirtualNode) {
    return;
  }
  if (!oldVirtualNode) {
    parent.appendChild(mount(newVirtualNode));
  } else if (!newVirtualNode) {
    parent.removeChild(oldVirtualNode._realNode);
  } else if (typeof newVirtualNode !== typeof oldVirtualNode ||
      oldVirtualNode.isTextNode ||
      newVirtualNode.type !== oldVirtualNode.type) {
    parent.replaceChild(mount(newVirtualNode), oldVirtualNode._realNode);
  } else {
    const realNode = oldVirtualNode._realNode;
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
