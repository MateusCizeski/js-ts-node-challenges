//Complexidade espacia O(1) só aloca um nodo inicial para o problema
//Complexidade temporal O(n), o pior dos casos é percorerr as listas uma vez cada

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function printList(head) {
  const result = [];
  while (head !== null) {
    result.push(head.val);
    head = head.next;
  }
  console.log(result);
}

var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(-1);
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }

    current = current.next;
  }

  current.next = list1 !== null ? list1 : list2;

  return dummy.next;
};

const list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

const merged = mergeTwoLists(list1, list2);
printList(merged);
