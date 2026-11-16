export interface DemoFormData {
  id: string;
  name: string;
  path: string;
  testEmail: string;
}

/**
 * Test dataset containing 20 demo forms that redirect to the shared Thank You endpoint.
 */
export const demoForms: DemoFormData[] = [
  {
    id: 'demo-01',
    name: 'Accessibility Widget Demo',
    path: '/demo/accessibility-widget',
    testEmail: 'test.widget@example.com',
  },
  {
    id: 'demo-02',
    name: 'Enterprise Compliance Demo',
    path: '/demo/enterprise-compliance',
    testEmail: 'test.enterprise@example.com',
  },
  {
    id: 'demo-03',
    name: 'PDF Accessibility Remediation Demo',
    path: '/demo/pdf-remediation',
    testEmail: 'test.pdf@example.com',
  },
  {
    id: 'demo-04',
    name: 'Higher Education Accessibility Demo',
    path: '/demo/higher-ed',
    testEmail: 'test.highered@example.com',
  },
  {
    id: 'demo-05',
    name: 'Government & Public Sector Demo',
    path: '/demo/government',
    testEmail: 'test.gov@example.com',
  },
  {
    id: 'demo-06',
    name: 'Healthcare Accessibility Demo',
    path: '/demo/healthcare',
    testEmail: 'test.healthcare@example.com',
  },
  {
    id: 'demo-07',
    name: 'Financial Services Demo',
    path: '/demo/financial-services',
    testEmail: 'test.finance@example.com',
  },
  {
    id: 'demo-08',
    name: 'E-Commerce & Retail Demo',
    path: '/demo/ecommerce',
    testEmail: 'test.ecommerce@example.com',
  },
  {
    id: 'demo-09',
    name: 'Legal & Law Firm Demo',
    path: '/demo/legal-firms',
    testEmail: 'test.legal@example.com',
  },
  {
    id: 'demo-10',
    name: 'VPAT & ACR Audit Consultation Demo',
    path: '/demo/vpat-acr',
    testEmail: 'test.vpat@example.com',
  },
  {
    id: 'demo-11',
    name: 'Accessibility Scanner & Monitor Demo',
    path: '/demo/scanner-monitor',
    testEmail: 'test.scanner@example.com',
  },
  {
    id: 'demo-12',
    name: 'Mobile App Accessibility Demo',
    path: '/demo/mobile-apps',
    testEmail: 'test.mobile@example.com',
  },
  {
    id: 'demo-13',
    name: 'Agency & Partner Program Demo',
    path: '/demo/agency-partner',
    testEmail: 'test.partner@example.com',
  },
  {
    id: 'demo-14',
    name: 'Developer API & Integration Demo',
    path: '/demo/api-integrations',
    testEmail: 'test.api@example.com',
  },
  {
    id: 'demo-15',
    name: 'Media & Publishing Demo',
    path: '/demo/media-publishing',
    testEmail: 'test.media@example.com',
  },
  {
    id: 'demo-16',
    name: 'Hospitality & Travel Demo',
    path: '/demo/hospitality-travel',
    testEmail: 'test.hospitality@example.com',
  },
  {
    id: 'demo-17',
    name: 'SaaS Platform Accessibility Demo',
    path: '/demo/saas-platform',
    testEmail: 'test.saas@example.com',
  },
  {
    id: 'demo-18',
    name: 'Non-Profit Organization Demo',
    path: '/demo/non-profit',
    testEmail: 'test.nonprofit@example.com',
  },
  {
    id: 'demo-19',
    name: 'Human-in-the-Loop Audit Demo',
    path: '/demo/human-audit',
    testEmail: 'test.human-audit@example.com',
  },
  {
    id: 'demo-20',
    name: 'Executive Consultation Demo',
    path: '/demo/executive-consultation',
    testEmail: 'test.executive@example.com',
  },
];

export default demoForms;
