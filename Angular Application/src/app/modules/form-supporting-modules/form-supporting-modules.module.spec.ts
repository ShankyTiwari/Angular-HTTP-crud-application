import { FormSupportingModulesModule } from './form-supporting-modules.module';

describe('FormSupportingModulesModule', () => {
  let formSupportingModulesModule: FormSupportingModulesModule;

  beforeEach(() => {
    formSupportingModulesModule = new FormSupportingModulesModule();
  });

  it('should create an instance', () => {
    expect(formSupportingModulesModule).toBeTruthy();
  });
});
