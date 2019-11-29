import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let text: Promise<string>;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    text = page.getAppRootText();
  });

  it('should have a Username span', () => {
    expect(text).toContain('Username');
  });

  it('should have a Password span', () => {
    expect(text).toContain('Password');
  });

  it('should have a Login button', () => {
    expect(text).toContain('Login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
