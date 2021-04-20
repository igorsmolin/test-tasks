function request(url, { body = null, method = 'GET' } = {}) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    
    xhr.send(body && JSON.stringify(body));

    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error('Error while making request'));
    };
  });
}

function doubleRequest() {
  const promise1 = request('http://jsonplaceholder.typicode.com/posts/1');
  const promise2 = request('http://jsonplaceholder.typicode.com/posts/2', {
    method: 'PATCH',
    body: { title: 'newTitle' },
  });

  Promise.allSettled([promise1, promise2]).then((results) => {
    console.log('Both results have been obtained: ', results);
  });
}
