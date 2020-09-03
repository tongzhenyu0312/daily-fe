function fetch(value) {
  console.log(value);
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 10000 * Math.random());
  });
}

const fetch2pool = (function() {
  const MaxPool = 5;
  const pool = [];
  const fetching = [];

  function fetchStart() {
    const handle = pool.pop();
    if (typeof handle === 'function') {
      fetching.push(handle());
    }
  }

  function fetchComplete(value) {
    const index = fetching.findIndex((item) => item === value);
    fetching.splice(index, 1);
    fetchStart();
  }

  function fetchHandle(value, resolve, reject) {
    fetch(value)
      .then((res) => {
        fetchComplete(value);
        resolve(res);
      })
      .catch((err) => {
        fetchComplete(value);
        reject(err);
      });
  }

  return (value) => {
    return new Promise((...executor) => {
      pool.push(() => fetchHandle(value, ...executor));
      while (pool.length && fetching.length < MaxPool) {
        fetchStart();
      }
    });
  };
})();

Array(10)
  .fill('')
  .forEach((item, index) => {
    fetch2pool(index).then((res) => {
      console.log('fetch', index);
    });
  });