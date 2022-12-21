```
class A {
  b;

  constructor({ b }) {
    this.b = b;
  }

  test(value) {
    return value + this.b.test(1) + 1;
  }
}

class B {
  test(value) {
    return value + 1;
  }
}

const dependencies = {
  A(container) {
    const b = container.get('B');

    const a = new A({ b });

    return a;
  },
  B() {
    const b = new B();

    return b;
  }
}

const dIContainer = new DIContainer(dependencies);
const a = dIContainer.get('A');
const result = a.test(1);

console.log(result); // 4
```