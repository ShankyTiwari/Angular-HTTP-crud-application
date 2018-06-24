import { FormSupportingModule } from './form-supporting.module';

describe('FormSupportingModule', () => {
	let formSupportingModule: FormSupportingModule;

	beforeEach(() => {
		formSupportingModule = new FormSupportingModule();
	});

	it('should create an instance', () => {
		expect(formSupportingModule).toBeTruthy();
	});
});
