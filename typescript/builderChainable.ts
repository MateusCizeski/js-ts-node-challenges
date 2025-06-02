type Builder<T extends object = {}> = {
  set<K extends string, V>(key: K, value: V): Builder<T & { [P in K]: V }>;
  build(): T;
};

function builder<T extends object = {}>(data: T = {} as T): Builder<T> {
  return {
    set<K extends string, V>(key: K, value: V) {
      return builder({ ...data, [key]: value });
    },
    build() {
      return data;
    }
  };
}

const user = builder()
  .set("name", "João")
  .set("idade", 25)
  .set("ativo", true)
  .build();

console.log(user);
