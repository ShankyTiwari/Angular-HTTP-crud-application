import { Validators } from '@angular/forms';

export class UserNameValidation {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.pattern(/^[A-Za-z]+$/),
					Validators.required
				]
			)
		];

	}
}
