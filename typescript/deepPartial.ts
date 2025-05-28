type Example = {
    a: string;
    b: {
        c: number;
        d: boolean;
    };
};

type Result = DeepPartial<Example>;


type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepPartial<T[K]>
    : T[K];
};

type User = {
  id: number;
  name: string;
  settings: {
    theme: string;
    notifications: {
      email: boolean;
      sms: boolean;
    };
  };
  log: () => void;
};

type PartialUser = DeepPartial<User>;