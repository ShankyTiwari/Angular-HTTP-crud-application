import { Validators } from '@angular/forms';

export class EmailValidation {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.email,
					Validators.required,
				],
			),
		];
	}
}
