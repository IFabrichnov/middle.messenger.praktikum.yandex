enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface RequestOptions {
  method?: RequestMethods;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  retryCount?: number;
  timeout?: number;
}

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;

export default class HTTPTransport {
  private static buildQueryString(params: Record<string, any>) {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  public get: HTTPMethod = (url, options) => {
    return this.sendRequest(url, {...options, method: RequestMethods.GET});
  };

  public post: HTTPMethod = (url, options) => {
    return this.sendRequest(url, {...options, method: RequestMethods.POST});
  };

  public put: HTTPMethod = (url, options) => {
    return this.sendRequest(url, {...options, method: RequestMethods.PUT});
  };

  public delete: HTTPMethod = (url, options) => {
    return this.sendRequest(url, {...options, method: RequestMethods.DELETE});
  };

  private sendRequest(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    const {method = RequestMethods.GET, data, headers = {}, timeout = 5000} = options;
    const isGetRequest = method === RequestMethods.GET && data;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const requestUrl = isGetRequest ? `${url}?${HTTPTransport.buildQueryString(data!)}` : url;

      xhr.open(method, requestUrl);
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([header, value]) => xhr.setRequestHeader(header, value));

      xhr.onload = () => resolve(xhr);
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onabort = reject;

      if (isGetRequest || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
