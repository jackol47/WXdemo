export function node(value) {
  this.element = value;
  this.next = null;
}

export class LList {
  head = new Node('head');

  find(item) {
    let currentNode = this.head;
    while (currentNode.element != item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  insert(item) {
    let newNode = new Node(item);
    let currentNode = this.find(item);
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }

  display() {
    let currentNode = this.head;
    while (!(currentNode.next == null)) {
      console.log(currentNode.next.element);
      currentNode = currentNode.next;
    }
  }

  findPrev(item) {
    let currentNode = this.head;
    while (!(currentNode.next == null) && currentNode.next.element != item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  remove(item) {
    let preNode = this.findPrev(item);
    if (!(preNode.next == null)) {
      preNode.next = preNode.next.next;
    }
  }
}

export default LList;
