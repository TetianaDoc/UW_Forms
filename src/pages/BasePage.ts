import { type Page, type Response } from '@playwright/test';

/**
 * BasePage encapsulates common browser page interactions, navigation,
 * and lifecycle/loading state synchronization.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigates to a specific URL or relative path.
   * @param path Target URL or relative path (default: '/')
   */
  async navigate(path: string = '/'): Promise<Response | null> {
    return await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Waits for the page to reach a specified load state.
   * @param state 'load' | 'domcontentloaded' | 'networkidle' (default: 'domcontentloaded')
   */
  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  /**
   * Waits until network activity has subsided (networkidle).
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Waits for the current page URL to match the expected pattern or string.
   * @param urlOrRegExp String or RegExp representing the expected URL.
   * @param options Optional timeout and waitUntil settings.
   */
  async waitForUrl(
    urlOrRegExp: string | RegExp,
    options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' }
  ): Promise<void> {
    await this.page.waitForURL(urlOrRegExp, options);
  }

  /**
   * Returns the current page URL.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Returns the current document title.
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Reloads the current page.
   */
  async reload(): Promise<Response | null> {
    return await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Returns the underlying Playwright Page instance.
   */
  getPage(): Page {
    return this.page;
  }
}
