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

	list(params: Params = {}, options: Options = {}): Observable<any> {
		return this.http.get(this.url, {params: params});
	}

	post(body: any, options: Options = {}): Observable<any> {
		return this.http.post(this.url, body, options);
	}

	delete(id: number): Observable<{}> {
		return this.http.delete(this.url + id);
	}

}