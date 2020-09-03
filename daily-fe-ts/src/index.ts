type $Exclude<T, U> = T extends U ? never : T;

type my = $Exclude<'b' | 2, 'a' | 'b' | 1 | 2>;
