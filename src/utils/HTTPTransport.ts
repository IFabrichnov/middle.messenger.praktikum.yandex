enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

interface RequestOptions {
  method?: RequestMethods;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
}

type HTTPMethod = <Response=unknown>(url: string, data?: unknown) => Promise<Response>;

export default class HTTPTransport {
  protected endpoint: string;

  private API_URL = 'https://ya-praktikum.tech/api/v2';

  constructor(endpoint: string) {
    this.endpoint = `${this.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, {method: RequestMethods.GET, data })
  };

  public post: HTTPMethod = (url, data) => {
    return this.request(this.endpoint  + url, { method: RequestMethods.POST, data});
  };

  public put: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, { method: RequestMethods.PUT, data });
  };

  public delete: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, { method: RequestMethods.DELETE, data });
  };

  private request(url: string, options: RequestOptions = { method: RequestMethods.GET }): Promise<any> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method as any, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject(new Error('abort'));
      xhr.onerror = () => reject(new Error('network error'));
      xhr.ontimeout = () => reject(new Error('timeout'));

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (data instanceof FormData) {
        xhr.send(data);
        return;
      }

      xhr.setRequestHeader('Content-Type', 'application/json');

      if (method === RequestMethods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
