import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import HTTPTransport from './HTTPTransport.ts';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[] = [];
  let instance: HTTPTransport;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
    requests = [];
  });

  it('should make a GET request on .get()', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('should make a POST request on .post()', () => {
    instance.post('/user');

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });

  it('should make a PUT request on .put()', () => {
    instance.put('/user');

    const [request] = requests;

    expect(request.method).to.eq('PUT');
  });

  it('should make a PATCH request on .patch()', () => {
    instance.patch('/user');

    const [request] = requests;

    expect(request.method).to.eq('PATCH');
  });

  it('should make a DELETE request on .delete()', () => {
    instance.delete('/user');

    const [request] = requests;

    expect(request.method).to.eq('DELETE');
  });

  it('should include Content-Type header in POST requests', () => {
    instance.post('/user', 'test');

    const [request] = requests;

    expect(request.requestHeaders).to.include.keys('Content-Type');
  });

  it('should not add Content-Type header when using FormData', () => {
    instance.post('/user', new FormData());

    const [request] = requests;

    expect(request.requestHeaders).not.to.include.keys('Content-Type');
  });
});
