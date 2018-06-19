import { Validators } from '@angular/forms';

export class CountryValidation {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.pattern(/^(?!City)(?:\w+)$/),
					Validators.required
				]
			)
		];

	}
}
