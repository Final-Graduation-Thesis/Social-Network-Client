import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Options {
	[key: string]: any;
}

export interface Params {
	[key: string]: any;
}

export abstract class BaseService {

	protected http: HttpClient;
	protected url: string;

	list(urlLink: string = this.url, params: Params = {}, options: Options = {}): Observable<any> {
		return this.http.get(urlLink ? urlLink : this.url, {params: params});
	}

	get(id: number, params: Params = {}): Observable<any> {
        return this.http.get(this.url + id, {params: params});
	}

	post(body?: any, options: Options = {}): Observable<any> {
		return this.http.post(this.url, body, options);
	}

	put(id: number, body: any, options: Options = {}): Observable<any> {
		return this.http.put(this.url + id, body, options);
	}

	delete(id: number): Observable<{}> {
		return this.http.delete(this.url + id);
	}

}